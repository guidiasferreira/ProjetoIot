
const temperatura = document.querySelector("#temperatura");
const altitude = document.querySelector("#altitude");
const pressao = document.querySelector("#pressao");
const bolaStatus = document.querySelector("#status-ball");
const textoStatus = document.querySelector("#status-text");
const nomeLavoura = document.querySelector("#name-prop");

export function atualizarCards(dados, lavoura) {
    const nome = dados.nome ? String(dados.nome) : lavoura.replace('_', ' ').toUpperCase();
    nomeLavoura.innerHTML = nome;
    
    temperatura.innerHTML = `${dados.temperatura !== undefined ? Number(dados.temperatura).toFixed(2) : "--"} <span class='unidade'>°C</span>`;
    altitude.innerHTML = `${dados.altitude !== undefined ? Number(dados.altitude).toFixed(2) : "--"} <span class='unidade'>m</span>`;
    pressao.innerHTML = `${dados.pressao !== undefined ? Number(dados.pressao).toFixed(2) : "--"} <span class='unidade'> hPa</span>`;
}


export function atualizarStatus(online, mensagem) {
    textoStatus.innerText = mensagem;

    if (online) {
        bolaStatus.classList.remove("offline");
        bolaStatus.classList.add("online");

    } else {
        bolaStatus.classList.remove("online");
        bolaStatus.classList.add("offline");
    }
}