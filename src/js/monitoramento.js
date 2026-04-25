import { database } from "./firebase_config.js";
import { atualizarCards, atualizarStatus } from "./interface.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const seletorEstufa = document.querySelector("#seletor-estufa");
let conexaoAtual = null;

export function iniciarMonitoramento(estufaEscolhida) {
    if (conexaoAtual) {
        conexaoAtual(); // Desliga a conexão anterior
    }

    const sensorRef = ref(database, `/Fazenda São Pedro/Estufas/${estufaEscolhida}`);

    atualizarStatus(false, "Buscando dados...");

    conexaoAtual = onValue(sensorRef, (snapshot) => {
        const dados = snapshot.val();

        if (dados) {
            atualizarStatus(true, "Online - Sincronizado!");
            atualizarCards(dados, estufaEscolhida);

        } else {
            atualizarStatus(false, "Estufa sem dados armazenados...");
            atualizarCards({}, estufaEscolhida);
        }
    });
}