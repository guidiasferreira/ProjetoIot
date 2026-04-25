
const seletorEstufa = document.querySelector("#seletor-estufa");
const temperatura = document.querySelector("#temperatura");
const umidade = document.querySelector("#umidade");
const pressao_atmosferica = document.querySelector("#pressao");
const ballStatus = document.querySelector("#status-ball");
const textoStatus = document.querySelector("#status-text");
const nameProp = document.querySelector("#name-prop");

export function atualizarCards(dados, estufaEscolhida) {
    nameProp.innerHTML = dados.nome || estufaEscolhida;
    temperatura.innerHTML = `${dados.temperatura || "--"} <span class='unidade'>°C</span>`;
    umidade.innerHTML = `${dados.umidade || "--"} <span class='unidade'>%</span>`;
    pressao_atmosferica.innerHTML = `${dados.pressao_atmosferica || "--"} <span class='unidade'> hPa</span>`;
}


export function atualizarStatus(online, mensagem) {
    textoStatus.innerText = mensagem;

    if (online) {
        ballStatus.classList.remove("offline");
        ballStatus.classList.add("online");

    } else {
        ballStatus.classList.remove("online");
        ballStatus.classList.add("offline");
    }
}