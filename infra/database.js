import { Client } from "pg";

// Conectando-se ao banco de dados com pg -> node-postgres

async function query(queryObject) {
  const client = new Client({
    //Configurando o client passando host, port e password utilizando as variáveis de ambiente criadas

    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
