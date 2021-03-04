### :rocket: Tecnologias usadas

Neste projeto utilizei as seguintes tecnologias

- [TypeScript](https://www.typescriptlang.org/)

- [Node.js](https://nodejs.org/)

- [Express](https://expressjs.com/pt-br/)

- [TypeORM](https://typeorm.io/#/)

- [Postgresql](https://www.postgresql.org/)

- [JWT](https://jwt.io/)

- [Jest](https://jestjs.io/)

---

### :dart: Como rodar

Para rodar este projeto, você ira precisar ter o [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/) e o [Postgresql](https://www.postgresql.org/) instalado em seu computador.

Antes de rodar o projeto, você ira ter que criar um banco de dados no Postgresql com nome "**navers**", e para rodar os testes, precisa ter um banco de dados com nome "**navers_tests**". E susbstitua os campos (username, password) do arquivo "**ormconfig.js**" de acordo com o seu banco de dados.

Na raiz do arquivo tem o arquivo **Insomnia_2021-03-04.json**, da pra importar no Insomnia para executar as requisições.

Na linha de comando execute:

```bash

# Clone o repositório

$ git clone https://github.com/vinisioux/navers

# Entre no diretório
$ cd navers/

# Instalar as dependências
$ yarn

# Rodar as migrations
$ yarn typeorm migration:run

# Execute o comando abaixo para startar o app
$ yarn dev

# Para rodar os testes, execute o comando abaixo: (após ter criado o banco de dados "navers_tests")
$ yarn test

```
