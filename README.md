# NP2 EC021


## Módulos usados
**Linguagem:** TypeScript

**Axios:** Biblioteca usada para consumir APIs externas  
**Mongoose:** Biblioteca do Nodejs que traduz os dados do banco de dados para objetos JavaScript para serem utilizados na aplicação  
**Restify:** Framework Web feito em Node para criação de APIs REST  
**Dotenv:** Usado para gerenciar as variáveis ambiente do projeto

## Como configurar
Preencha o arquivo `.env` com as seguintes URLs:

    PORTA=8080

    DB_URL=mongodb+srv://adauto:adauto@cluster0-rven8.mongodb.net/test?retryWrites=true&w=majority
    DB_NAME=ec021-av2-core
    URL_VALIDATE_TOKEN=https://ec021-av2-auth.herokuapp.com/auth/validateToken
    URL_LOGIN=https://ec021-av2-auth.herokuapp.com/auth/login

## Criar a imagem Docker
Execute o arquivo `docker-build-run.sh` usando o comando:

**Se Windows:** `sh docker-build-run.sh`  
**Se Linux:** `bash docker-build-run.sh`  

Este arquivo `.sh` executa os comandos: `docker build -t ec021 .` e `docker run -p 8080:8080 -it ec021`

## Execução
Para rodar a aplicação execute os seguintes comandos no terminal na pasta do projeto:

    npm install
    npm run start
    
## Autores:
William Fraga Guimarães Barreiro (https://github.com/WilliamFB)

Brener Oliveira dos Reis (https://github.com/brenerovl)
