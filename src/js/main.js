import { iniciarMonitoramento } from "./monitoramento.js";
import { abrirGrafico } from "./grafico.js";

const seletorLavoura = document.querySelector("#seletor-estufa");
const btnGrafico = document.querySelector("#btn-grafico");

document.addEventListener("DOMContentLoaded", () => {
    iniciarMonitoramento(seletorLavoura.value);
});

seletorLavoura.addEventListener("change", (evento) => {
    iniciarMonitoramento(evento.target.value);
});

btnGrafico.addEventListener("click", abrirGrafico);