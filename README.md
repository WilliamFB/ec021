# NP2 EC021


## Módulos usados
**Linguagem:** TypeScript

**Axios:** Biblioteca usada para consumir APIs externas  
**Mongoose:** Biblioteca do Nodejs que traduz os dados do banco de dados para objetos JavaScript para serem utilizados na aplicação  
**Restify:** Framework Web feito em Node para criação de APIs REST  
**Dotenv:** Usado para gerenciar as variáveis ambiente do projeto

## Como configurar
Importe a coleção do Postman que estará disponível na raiz do projeto com o nome `AV2 de EC021.postman_collection.json`

Importe as variáveis de ambiente do Postman disponível na raiz do projeto com o nome `AV2 EC021 Ambiente.postman_environment.json`

O arquivo `.env` já estará preenchido:

    PORTA=8080

    DB_URL=mongodb+srv://adauto:adauto@cluster0-rven8.mongodb.net/test?retryWrites=true&w=majority
    DB_NAME=ec021-av2-core
    URL_VALIDATE_TOKEN=https://ec021-av2-auth.herokuapp.com/auth/validateToken
    URL_LOGIN=https://ec021-av2-auth.herokuapp.com/auth/login

## Criar a imagem Docker
Executa os comandos:

    docker build -t ec021 .
    docker run -p 8080:8080 -it ec021

Ou, se preferir, execute o script `docker-build-run.sh`

## Execução
Para rodar a aplicação sem o Docker execute os seguintes comandos no terminal na pasta do projeto:

    npm install
    npm run start
    
## Autores:
William Fraga Guimarães Barreiro (https://github.com/WilliamFB)

Brener Oliveira dos Reis (https://github.com/brenerovl)
