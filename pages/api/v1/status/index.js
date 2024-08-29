//Criando uma rota pública: Basta criar um arquivo dentro da pasta /pages/api
// Quando a api /status for consultada é bom fazer um teste de conexão com o banco de dados, para isso importamos o database.js para a rota da api

import database from "infra/database.js";

export default async function status(request, response) {
  //Testando uma query

  const result = await database.query("SELECT 1 + 1 AS sum;");
  console.log(result.rows[0]);
  //Definindo uma resposta para uma requisição a api /status
  response.status(200).json({ chave: "Requisição bem sucedida!" }); //Código 200 - > Requisição deu certo.
  //O método .send envia a informação passada
  //O método .json envia a informação passada em forma de arquivo JSON no formato "chave: valor" para o navegador assumindo já o formato utf-8
}

//CURL -> É um Client que faz requisições HTTP
