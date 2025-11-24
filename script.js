let cardContainer = document.querySelector(".card-container");
let dados = [];

async function buscarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    // renderizarCards(dados); // Remove a renderização inicial
    configurarBusca();
}

function configurarBusca() {
    const formBusca = document.querySelector("#search-form");
    const inputBusca = document.querySelector("#search-input");

    formBusca.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        const termoBuscado = inputBusca.value.toLowerCase();

        if (termoBuscado) { // Só executa a busca se o termo não for vazio
            const dadosFiltrados = dados.filter(dado =>
                dado.nome.toLowerCase().includes(termoBuscado) ||
                dado.descricao.toLowerCase().includes(termoBuscado)
            );
            renderizarCards(dadosFiltrados);
        } else {
            renderizarCards([]); // Limpa os resultados se a busca for vazia
        }
    });
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ''; // Limpa o container antes de renderizar os cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>Ano de criação: ${dado.data_criacao}</p> 
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais></a>
        `
        cardContainer.appendChild(article);
    }
}

buscarDados();


        
