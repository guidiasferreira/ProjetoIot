import { database } from "./firebase_config.js";
import { atualizarCards, atualizarStatus } from "./interface.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const seletorEstufa = document.querySelector("#seletor-estufa");
let conexaoAtual = null;

export function iniciarMonitoramento(lavoura) {
    if (conexaoAtual) {
        conexaoAtual();
    }

    const sensorRef = ref(database, `/lavouras/${lavoura}/estado_atual`);
    const mainElement = document.querySelector(".main");

    atualizarStatus(false, "Buscando dados...");

    if (mainElement) mainElement.classList.add("loading");

    conexaoAtual = onValue(sensorRef, (snapshot) => {
        const dados = snapshot.val();

        if (dados) {
            atualizarStatus(true, "Online - Sincronizado!");
            atualizarCards(dados, lavoura);

        } else {
            atualizarStatus(false, "Lavoura sem dados armazenados...");
            atualizarCards({}, lavoura);
        }

        setTimeout(() => {
            if (mainElement) mainElement.classList.remove("loading");
        }, 150);
    });
}