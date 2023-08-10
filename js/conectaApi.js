// função assíncrona para que o fetch da API ocorra antes das outras linhas de código serem executadas.
async function listaVideos() {
    // através de fetch, recebemos os valores presentes na API do json.server.
    const conexao = await fetch('http://localhost:3000/videos');
    // transforma os dados obtidos da API em formato .json, aguardando até que a formatação seja concluída.
    const conexaoConvertida = await conexao.json();
    // finaliza a function e retorna a lista em conexao.json quando a function for chamada. 
    return conexaoConvertida;
}

// função assíncrona responsável por enviar os vídeos criados para a API. Os parâmetros serão as informações cadastradas na tela de envio do vídeo.  
async function criaVideo(titulo, descricao, url, imagem) {
    // através de fetch acessamos os objetos presentes na API.
    const conexao = await fetch('http://localhost:3000/videos', {
        // com method: "POST" especificamos que o método a ser utilizado será o POST, em que estaremos enviando dados a API, ao invés de receber.
        method: "POST",
        // especifica que o arquivo a ser enviado é do tipo json.
        headers: {
            "Content-type": "application/json"
        },
        // corpo da requisição, em que estaremos enviando um objeto com propriedades em formato de string.
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} visualizações`,
            url: url,
            imagem: imagem
        })
    })

    // caso a conexao não esteja ok, será jogado/enviado um erro. 
    if(!conexao.ok) {
        throw new Error("Não foi possível enviar o vídeo.")
    }

    // formata o arquivo da API em formato .json.
    const conexaoConvertida = await conexao.json();
    // finaliza a function e retorna a lista atualizada em conexao.json quando for chamada. 
    return conexaoConvertida;
}

// função assíncrona responsável pela busca de vídeos. 
async function buscaVideo(termoDeBusca) {
    // através de fetch, acessamos as informações da API, buscando por vídeos que possuem determinado termoDeBusca procurado. 
    // ?q= --> a expressão pergunta à API se há algum vídeo com o termoDeBusca especificado, buscando dentro de todo o db.json. Se houver, retorna os itens que correspondem à busca. 
    const conexao = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`);
    // formata o arquivo em bytes da API em formato .json.
    const conexaoConvertida = await conexao.json();
    // finaliza a function e retorna a lista atualizada com os resultados da busca quando for chamada. 
    return conexaoConvertida;
}

// exporta a variável conectaApi e criaVideo, que recebe um objeto com funções, para que possam ser utilizadas em outros arquivos.
export const conectaApi = { listaVideos, criaVideo, buscaVideo }