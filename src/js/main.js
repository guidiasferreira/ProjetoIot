import { iniciarMonitoramento } from "./monitoramento.js";

const seletorEstufa = document.querySelector("#seletor-estufa");

document.addEventListener("DOMContentLoaded", () =>{    
    iniciarMonitoramento(seletorEstufa.value);
});

seletorEstufa.addEventListener("change", (evento) =>{
    iniciarMonitoramento(evento.target.value);
});