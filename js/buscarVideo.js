// importa a variável conectaApi.
import { conectaApi } from "./conectaApi.js";
// importa a function constroiCard.
import constroiCard from "./mostraVideos.js";

// function assíncrona responsável por obter o valor digitado no campo de busca. 
async function buscarVideo(event) {
    // quando o botão de pesquisar for clicado, ele evita o redirecionamento da página. 
    event.preventDefault();
    // seleciona o valor da data-attribute "data-pesquisa", que nada mais é que o termo digitado no campo de busca. 
    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
    // chama a function buscaVideo de conectaApi, especificando o parâmetro como o valor obtido na const dadosDePesquisa (termo que será pesquisado na API).
    const busca = await conectaApi.buscaVideo(dadosDePesquisa);

    // seleciona a lista de vídeos através de seu data-attribute.
    const lista = document.querySelector("[data-lista]")

    // deixa a lista vazia. 
    // lista.innerHTML = '';
    
    // enquanto a lista possuir um primeiro elemento-filho, ele será removido. O looping se manterá até que a lista não possua mais um elemento-filho. Isso foi feito para que, quando a busca seja feita, não apareçam outros vídeos além daqueles que foram buscados. 
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
     }

    // para cada vídeo obtido na pesquisa, adicionamos um elemento-filho no final do elemento-pai, que será uma li inserida a partir da function constroiCard, utilizando as propriedades de cada vídeo obtido na pesquisa. 
    busca.forEach(e => lista.appendChild(constroiCard(e.titulo, e.descricao, e.url, e.imagem)))

    
    // caso a quantidade de vídeos obtidos na busca seja igual a 0, será inserido uma mensagem de erro. 
    if (busca.length == 0) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Busca não encontrada.</h2>`
    }
}

// seleciona o botão de pesquisa através de sua data-attribute.
const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");
// ao botãoDePesquisa ser clicado, invoca a function buscarVideo com o parâmetro event, que indica que o formulário foi enviado. 
botaoDePesquisa.addEventListener("click", event => buscarVideo(event));