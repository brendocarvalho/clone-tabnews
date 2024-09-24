//Criando uma rota pública: Basta criar um arquivo dentro da pasta /pages/api
// Quando a api /status for consultada é bom fazer um teste de conexão com o banco de dados, para isso importamos o database.js para a rota da api

import database from "infra/database";

export default async function status(request, response) {
  //Criando requisições que serão obtidas na requisição da api /status
  const updatedAt = new Date().toISOString();

  //Comando SHOW na query para buscar os dados de configurações do banco, nesse caso a versão do postgres.
  const pgVersionQuery = await database.query("SHOW server_version;");
  const pgVersionValue = pgVersionQuery.rows[0].server_version;

  //Query para buscar a quantidade máxima de conexões
  const maxConnectionsQuery = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnectionsQuery.rows[0].max_connections;

  // Passando o nome do banco de dados para a consulta da query a partir da variável de ambiente. Assim quando o banco estiver em ambiente de produção, será feito automaticamente
  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsQuery = await database.query({
    // "SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';", -> query hardcoded
    //::int converte o valor para inteiro já no banco
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
    // O valor do array irá substituir o placeholder "$1"
  });

  const openedConnectionsValue = openedConnectionsQuery.rows[0].count;

  //Definindo uma resposta para uma requisição a api /status (Retorno do endpoint)
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: pgVersionValue,
        max_connections: +maxConnectionsValue,
        opened_connections: openedConnectionsValue,
      },
    },
  }); //Código 200 - > Requisição deu certo.
}
