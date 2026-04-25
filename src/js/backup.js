let alertasAtivos = [];

if (dados.temperatura >= TEMPERATURA_CRITICA) {
    alertasAtivos.push("TEMPERATURA");
    cardTemp.classList.add("card-alert");

} else {
    cardTemp.classList.remove("card-alert");
}


if (dados.umidade >= UMIDADE_CRITICA) {
    alertasAtivos.push("UMIDADE");
    cardUmid.classList.add("card-alert");

} else {
    cardUmid.classList.remove("card-alert");
}


if (dados.pressao_atmosferica >= PRESSAO_ATMOSFERICA_CRITICA) {
    alertasAtivos.push("PRESSÃO ATMOSFÉRICA");
    cardPressao.classList.add("card-alert");

} else {
    cardPressao.classList.remove("card-alert");
}

if (alertasAtivos.length > 0) {
    let variaveisRisco = alertasAtivos.join(" e ");

    alertText.innerHTML = `⚠️ <span class='span-text'>ALERTA CRÍTICO</span> ${variaveisRisco} ACIMA DO NORMAL`;
    alertBox.style.display = "flex";

} else {
    alertBox.style.display = "none";
}
