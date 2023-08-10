// importa a variável conectaApi do arquivo conectaApi.js.
import { conectaApi } from "./conectaApi.js"

// seleciona o data-attribute 'data-lista'
const lista = document.querySelector("[data-lista]")

// function utiliza os parâmetros titulo, descricao, url, imagem presentes como propriedades de cada item da lista, aplicando-as nas template strings para que cada card tenha suas informações específicas. 
export default function constroiCard(titulo, descricao, url, imagem) {
    // cria uma "li" com a classe "videos__item";
    const video = document.createElement("li");
    video.className = "videos__item";
    // insere dentro da "li" a estrutura que representa o card do video com suas respectivas propriedades. 
    video.innerHTML = 
    `<iframe width="100%" height="72%" src="${url}"
    title="${titulo}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
<div id ="descricao-video" class="descricao-video">
    <img src="${imagem}" alt="logo canal alura">
    <h3 id="titulo-video">${titulo}</h3>
    <p id="visualizacao-video">${descricao}</p>
</div>
`
    // retorna a const video com todos os elementos inseridos para que seja utilizada quando a function for chamada. 
    return video;
}

    // função assíncrona criada para aguardar a execução da function 'listaVideos()' importada, que retornará o arquivo .json da lista. 
async function listaVideos() {
    try {
    const listaApi = await conectaApi.listaVideos();
    // para cada item da lista da API foi criado um card ('li') ao chamar a function constroiCard(), anexando cada um dos itens dentro da 'ul' a partir da const lista (que representa a 'ul') e da propriedade .appendChild (anexará as 'li's como elemento filho de 'ul'). Serão utilizadas as propriedades de cada item (e.titulo, e.descricao, e.url, e.imagem) da lista para a construção do card, aplicando os valores especificos em cada template string.  
    listaApi.forEach((e) => 
        lista.appendChild(constroiCard(e.titulo, e.descricao, e.url, e.imagem)))
    // caso ocorra um erro (endpoint errado, api fora do ar), o catch pega esse erro e executa uma ação. Nesse caso, ele insere no HTML uma mensagem de erro. 
} catch {
    lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de vídeos</h2>`
}
}

// chama a function listaVideos() para que os vídeos apareçam na tela. 
listaVideos()