//Método GET/ para requisições HTTP e testes do método GET

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  //Para ver o corpo da requisição, o que de fato está retornando o fetch
  const responseBody = await response.json();

  //Confere se o valor de updated_at é vazio, null ou zero e compara com o valor padrão de ISOString gerando erro caso não tenha uma data válida
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.postgres_version).toEqual("16.0");

  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
