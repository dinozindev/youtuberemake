// importa a variável conectaApi que contém as functions listaVideos e criaVideo.
import {conectaApi} from "./conectaApi.js";

// seleciona o formulário que envia o vídeo. 
const formulario = document.querySelector("[data-formulario]");

async function criarVideo(event) {
    // previne que o formulário atualize a página após o envio.
    event.preventDefault();
    // seleciona o valor inserido no campo de imagem no formulário.
    const imagem = document.querySelector("[data-imagem]").value;
    // seleciona o valor inserido no campo de url no formulário.
    // const url = document.querySelector("[data-url]").value;
    // seleciona a url inserida que foi convertida para embed.
    const url = converterUrlParaEmbed(document.querySelector('[data-url]').value);
    // seleciona o valor inserido no campo de titulo no formulario.
    const titulo = document.querySelector("[data-titulo]").value;
    // seleciona o valor inserido no campo de descricao no formulário. 
    const descricao = document.querySelector("[data-descricao]").value;

try {
    // seleciona a function criaVideo da variável conectaApi, usando as constantes titulo, descricao, url e imagem como parâmetros para ela.
    await conectaApi.criaVideo(titulo, descricao, url, imagem);

    // página que será exibida caso o envio do vídeo seja concluído. 
    window.location.href = "../pages/envio-concluido.html";
    // caso ocorra um erro, catch irá receber o erro jogado por throw e exibirá em forma de alert. 
    } catch(e) {
        alert(e)
    }
}

// quando o formulário é enviado, ele avisa à function que um evento ocorreu, nesse caso, o submit do formulário. 
formulario.addEventListener("submit", event => criarVideo(event)) 

// function responsável por remover "watch?v=" do link do youtube e substituir por "embed/", que será responsável por exibir o vídeo no website. 
function converterUrlParaEmbed(url) {
    const embed = url.replace('watch?v=', 'embed/');
    // retorna a url convertida.
    return embed;
  }


