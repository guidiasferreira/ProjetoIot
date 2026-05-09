import { database } from "./firebase_config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const cards = document.querySelector(".cards");
const boxHistorico = document.querySelector(".box-historico");
const seletorLavoura = document.querySelector("#seletor-estufa");
const mainTitle = document.querySelector(".main-title");
const graficoWrapper = document.getElementById("grafico-wrapper");
const btnVoltar = document.getElementById("btn-voltar");

let charts = {
    temperatura: null,
    umidade: null,
    altitude: null,
    pressao: null
};

btnVoltar.addEventListener("click", () => {
    graficoWrapper.style.display = "none";
    cards.style.display = "flex";
    boxHistorico.style.display = "flex";
    mainTitle.style.display = "block";
});

/**
 * @param {string} canvasId 
 * @param {Chart|null} instanciaAntiga
 * @param {string[]} labels 
 * @param {number[]} dados 
 * @param {string} label 
 * @param {string} cor 
 * @param {string} unidade 
 * @returns {Chart} 
 */

function criarGrafico(canvasId, instanciaAntiga, labels, dados, label, cor, unidade) {
    if (instanciaAntiga) {
        instanciaAntiga.destroy();
    }

    const context = document.getElementById(canvasId);

    return new Chart(context, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: dados,
                borderColor: cor,
                backgroundColor: cor + "22",
                borderWidth: 2.5,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 7,
                pointBackgroundColor: cor,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 600,
                easing: "easeInOutQuart"
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => ` ${context.parsed.y.toFixed(2)} ${unidade}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: "rgba(0,0,0,0.05)" },
                    ticks: { font: { size: 11 } }
                },
                y: {
                    grid: { color: "rgba(0,0,0,0.05)" },
                    ticks: {
                        font: { size: 11 },
                        callback: (val) => `${val} ${unidade}`
                    }
                }
            }
        }
    });
}

export async function abrirGrafico() {
    cards.style.display = "none";
    boxHistorico.style.display = "none";
    mainTitle.style.display = "none";
    graficoWrapper.style.display = "flex";

    const lavouraSelecionada = seletorLavoura.value;

    try {
        const historicoRef = ref(database, `/lavouras/${lavouraSelecionada}/historico`);
        const snapshot = await get(historicoRef);

        if (snapshot.exists()) {
            const dados = snapshot.val();

            const extrair = (campo) => {
                const keys = Object.keys(dados[campo] || {}).sort().slice(-15);
                return {
                    labels: keys.map((_, i) => `L - ${i + 1}`),
                    valores: keys.map(k => Number(dados[campo][k]))
                };
            };

            const temperatura = extrair("temperatura");
            const umidade = extrair("umidade");
            const altitude = extrair("altitude");
            const pressao = extrair("pressao");

            charts.temperatura = criarGrafico("chart-temp", charts.temperatura, temperatura.labels, temperatura.valores, "Temperatura", "#e74c3c", "°C");
            charts.umidade = criarGrafico("chart-umidade", charts.umidade, umidade.labels, umidade.valores, "Umidade", "#3498db", "%");
            charts.altitude = criarGrafico("chart-altitude", charts.altitude, altitude.labels, altitude.valores, "Altitude", "#2ecc71", "m");
            charts.pressao = criarGrafico("chart-pressao", charts.pressao, pressao.labels, pressao.valores, "Pressão", "#705735", "hPa");

        } else {
            alert("Nenhum dado histórico encontrado para a lavoura selecionada.");
            btnVoltar.click();
        }

    } catch (error) {
        alert("Ocorreu um erro ao gerar o gráfico. Verifique a conexão com o Firebase:" + error);
        btnVoltar.click();
    }
}

seletorLavoura.addEventListener("change", () => {
    if (graficoWrapper.style.display === "flex") {
        abrirGrafico();
    }
});