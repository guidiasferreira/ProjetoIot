import { database } from "./firebase_config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const cards = document.querySelector(".cards");
const boxHistorico = document.querySelector(".box-historico");
const seletorLavoura = document.querySelector("#seletor-estufa");
const mainTitle = document.querySelector(".main-title");
const graficoWrapper = document.getElementById("grafico-wrapper");
const btnVoltar = document.getElementById("btn-voltar");

let chartInstance = null;

btnVoltar.addEventListener("click", () => {
    graficoWrapper.style.display = "none";
    cards.style.display = "flex";
    boxHistorico.style.display = "flex";
    mainTitle.style.display = "block";
});

export async function abrirGrafico() {
    cards.style.display = "none";
    boxHistorico.style.display = "none";
    mainTitle.style.display = "none";
    graficoWrapper.style.display = "flex";

    const ctx = document.querySelector("#chart");
    const lavouraSelecionada = seletorLavoura.value;

    try {
        const historicoRef = ref(database, `/lavouras/${lavouraSelecionada}/historico`);
        const snapshot = await get(historicoRef);

        if (snapshot.exists()) {
            const dados = snapshot.val();

            const tempKeys = Object.keys(dados.temperatura || {}).sort().slice(-20);
            const temperaturas = tempKeys.map(k => dados.temperatura[k]);

            const pressKeys = Object.keys(dados.pressao || {}).sort().slice(-20);
            const pressoes = pressKeys.map(k => dados.pressao[k]);

            const altKeys = Object.keys(dados.altitude || {}).sort().slice(-20);
            const altitudes = altKeys.map(k => dados.altitude[k]);

            const numLeituras = Math.max(temperaturas.length, pressoes.length, altitudes.length);
            const labels = Array.from({ length: numLeituras }, (_, i) => `L-${i + 1}`);

            if (chartInstance) {
                chartInstance.destroy();
            }

            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Temperatura (°C)',
                            data: temperaturas,
                            borderColor: '#e74c3c',
                            backgroundColor: 'rgba(231, 76, 60, 0.2)',
                            borderWidth: 2,
                            tension: 0.3,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Altitude (m)',
                            data: altitudes,
                            borderColor: '#2ecc71',
                            backgroundColor: 'rgba(46, 204, 113, 0.2)',
                            borderWidth: 2,
                            tension: 0.3,
                            yAxisID: 'y1'
                        },
                        {
                            label: 'Pressão (hPa)',
                            data: pressoes,
                            borderColor: '#3498db',
                            backgroundColor: 'rgba(52, 152, 219, 0.2)',
                            borderWidth: 2,
                            tension: 0.3,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Histórico de Variações"
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Tempo (Últimas Leituras)'
                            }
                        },

                        y: {
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Temperatura (°C)'
                            }
                        },

                        y1: {
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Altitude (m) / Pressão (hPa)'
                            },
                            grid: {
                                drawOnChartArea: false,
                            }
                        }
                    }
                },
            });

        } else {
            alert("Nenhum dado histórico encontrado para a lavoura selecionada.");
            btnVoltar.click();
        }

    } catch (erro) {
        console.error("Erro ao buscar histórico do Firebase:", erro);
        alert("Ocorreu um erro ao gerar o gráfico. Verifique a conexão com o Firebase.");
        btnVoltar.click();
    }
}