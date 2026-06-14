# 🌱 AgriSmart — Dashboard de Monitoramento Microclimático IoT

<p align="center">
  <img src="public/src/assets/img/planta.png" alt="AgriSmart Logo" width="80"/>
</p>

<p align="center">
  <strong>Dashboard web em tempo real para monitoramento de variáveis microclimáticas em lavouras agrícolas.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js"/>
</p>

---

## 📋 Sobre o Projeto

O **AgriSmart** é uma aplicação web IoT desenvolvida para monitorar em tempo real as condições microclimáticas de diferentes zonas de lavoura (Norte, Sul, Leste e Oeste). Os dados são coletados por dispositivos físicos (como ESP32 com sensores BME280/DHT) e armazenados no **Firebase Realtime Database**, sendo exibidos em um dashboard interativo com atualização instantânea via WebSocket.

### Funcionalidades

- 🌡️ **Monitoramento em tempo real** de Temperatura (°C), Umidade (%), Altitude (m) e Pressão Atmosférica (hPa)
- 🔀 **Troca dinâmica** entre as 4 lavouras sem recarregar a página
- 📊 **Gráfico histórico** interativo das últimas 15 leituras por sensor
- 🟢 **Indicador de status** online/offline da conexão com o Firebase
- 📱 **Design responsivo** para desktop, tablet e mobile

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────┐         ┌──────────────────────────┐         ┌──────────────────────┐
│  Dispositivo IoT │         │     Firebase Cloud        │         │  AgriSmart Dashboard │
│    (ESP32)       │──RTDB──▶│  Realtime Database       │──WS───▶│   (Web Browser)      │
│                 │         │  /lavouras/{id}/          │         │                      │
│  Sensores:      │         │    estado_atual           │         │  Cards em tempo real │
│  • Temperatura  │         │    historico/             │         │  Gráfico histórico   │
│  • Umidade      │         │      temperatura/         │◀─get()──│  (Chart.js)          │
│  • Altitude     │         │      umidade/             │         │                      │
│  • Pressão Atm. │         │      altitude/            │         │                      │
└─────────────────┘         │      pressao/             │         └──────────────────────┘
                            │                           │
                            │  Firebase Hosting         │
                            │  (Hospedagem da SPA)      │
                            └──────────────────────────┘

         Lavouras monitoradas: Norte | Sul | Leste | Oeste
```

---

## 🗂️ Estrutura de Arquivos

```
ProjetoIot/
├── public/
│   ├── index.html              # Página principal (SPA)
│   └── src/
│       ├── css/
│       │   └── main.css        # Estilos globais (Poppins, responsivo)
│       ├── js/
│       │   ├── main.js         # Ponto de entrada — eventos DOM
│       │   ├── firebase_config.js  # Inicialização do Firebase
│       │   ├── monitoramento.js    # Listener tempo real (onValue)
│       │   ├── grafico.js          # Lógica de gráficos (Chart.js)
│       │   └── interface.js        # Atualização do DOM
│       └── assets/
│           ├── img/            # Ícones e imagens
│           └── doc/            # Documentação adicional
├── firebase.json               # Configuração de hospedagem Firebase
├── .firebaserc                 # Projeto Firebase vinculado
└── README.md
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v14+)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- Conta no [Firebase](https://firebase.google.com/)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/guidiasferreira/ProjetoIot.git
cd ProjetoIot

# 2. Instale o Firebase CLI (caso ainda não tenha)
npm install -g firebase-tools

# 3. Faça login no Firebase
firebase login

# 4. Execute o servidor local
firebase serve --only hosting

# 5. Acesse no navegador
# http://localhost:5000
```

---

## ☁️ Deploy no Firebase Hosting

```bash
# Build e deploy completo
firebase deploy --only hosting
```

A aplicação estará disponível em:  
`https://monitoramentomicroclimático.web.app`

---

## 🔥 Estrutura do Firebase Realtime Database

```json
{
  "lavouras": {
    "lavoura_north": {
      "estado_atual": {
        "nome": "Lavoura Norte",
        "temperatura": 24.53,
        "umidade": 68.20,
        "altitude": 842.10,
        "pressao": 1013.25
      },
      "historico": {
        "temperatura": { "timestamp1": 24.1, "timestamp2": 24.8 },
        "umidade":     { "timestamp1": 67.0, "timestamp2": 69.3 },
        "altitude":    { "timestamp1": 841.5, "timestamp2": 842.0 },
        "pressao":     { "timestamp1": 1013.0, "timestamp2": 1013.5 }
      }
    },
    "lavoura_south": { ... },
    "lavoura_east":  { ... },
    "lavoura_west":  { ... }
  }
}
```

---

## 🧩 Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5 / CSS3** | Estrutura e estilo da SPA |
| **JavaScript (ES Modules)** | Lógica da aplicação |
| **Firebase Realtime Database** | Armazenamento e sincronização de dados em tempo real |
| **Firebase Hosting** | Hospedagem da aplicação web |
| **Chart.js** | Renderização de gráficos históricos |
| **Google Fonts (Poppins)** | Tipografia moderna |

---

## 👨‍💻 Autor

Desenvolvido por **Guilherme** — [@guidiasferreira](https://github.com/guidiasferreira)

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
