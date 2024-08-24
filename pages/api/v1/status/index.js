//Criando uma rota pública: Basta criar um arquivo dentro da pasta /pages/api

export default function status(request, response) {
  //Definindo uma resposta para uma requisição a api /status
  response.status(200).json({ chave: "Requisição bem sucedida!" }); //Código 200 - > Requisição deu certo.
  //O método .send envia a informação passada
  //O método .json envia a informação passada em forma de arquivo JSON no formato "chave: valor" para o navegador assumindo já o formato utf-8
}

//CURL -> É um Client que faz requisições HTTP
