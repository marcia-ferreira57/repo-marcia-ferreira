let cardContainer = document.querySelector(".card-container");
let dados = [];

async function buscarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
    configurarBusca();
}

function configurarBusca() {
    const inputBusca = document.querySelector("#busca"); // Assumindo que você tem um <input id="busca"> no seu HTML
    if (inputBusca) {
        inputBusca.addEventListener("input", () => {
            const termoBuscado = inputBusca.value.toLowerCase();
            const dadosFiltrados = dados.filter(dado =>
                dado.nome.toLowerCase().includes(termoBuscado) ||
                dado.descrição.toLowerCase().includes(termoBuscado)
            );
            renderizarCards(dadosFiltrados);
        });
    }
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ''; // Limpa o container antes de renderizar os cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>Ano de criação: ${dado.data_criacao}</p> 
        <p>${dado.descrição}</p>
        <a href="${dado.link}" target="blank">Saiba mais></a>
        `
        cardContainer.appendChild(article);
    }
}

buscarDados();


        
