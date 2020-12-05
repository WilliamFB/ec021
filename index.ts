import * as restify from 'restify';
const axios = require('axios');
const mongoose = require('mongoose');
const Meme = require('./models/Meme');


const SERVER_PORT = 8080;

const server = restify.createServer();

const DB = require('./database');

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
    res.send('ola moço');

    return next();
});

server.get('/alo/:name', aloname);
server.post('/login', login);
server.post('/meme', validateToken, createMeme);
server.patch('/meme/:id', validateToken, editMeme);
server.get('/meme/:id', validateToken, listMemes);

function validateToken(req, res, next) {

    const { token } = req.headers;

    if (token == undefined)
        return res.send(403, { 'erro': 'Token não fornecido' });


    let headersConfig = {
        headers: req.headers
    };

    axios.post('https://ec021-av2-auth.herokuapp.com/auth/validateToken', {}, headersConfig)
        .then(function (response) {
            console.log('1')
            if (response.status == 401) {
                return res.send(401, { 'erro': 'Token inválido' });
            }

            return next();
        })
        .catch(function (error) {
            if (error.status == 401)
                return res.send(401, { 'erro': 'Token inválido' });
        });
    return next();
}

async function aloname(req, res) {
    res.send('alo ' + req.params.name);
}

async function login(req, res) {
    const { username, password } = req.body;

    axios.post('https://ec021-av2-auth.herokuapp.com/auth/login', {
        username,
        password
    })
        .then(function (response) {
            return res.json(response.status, response.data);
        })
        .catch(function (error) {
            return res.json(error.response.status, error.response.data);
        });
}

async function createMeme(req, res) {
    const { titulo, descricao, ano } = req.body;

    let resposta = await Meme.create(
        {
            titulo,
            descricao,
            ano
        }
    );

    return res.json(201, resposta);
}

async function editMeme(req, res) {
    const { titulo, descricao, ano } = req.body;
    const { id } = req.params;

    await Meme.findByIdAndUpdate(id, { titulo, descricao, ano }, (err, memes) => {
        if(err) return console.error(err);
    });

    await Meme.findById(id, (err, memes) => {
        if(err) return console.error(err);

        return res.json(200, memes);
    });
}

async function listMemes(req, res) {
    const { id } = req.params;

    if (id) {
        // List por id
        await Meme.findById(id, (err, memes) => {
            if(err) return console.error(err);

            return res.json(200, memes);
        });
    } else {
        // List todos
        await Meme.find((err, memes) => {
            if(err) return console.error(err);
            
            return res.json(200, memes);
        });
    }
}

server.listen(SERVER_PORT, () => {
    console.log('%s listening at %s', server.name, server.url);

    mongoose.connect(DB.DB_URL, DB.DB_CONFIG, function (error) {
        if (!error) {
            console.log(`MongoDB Conectado`);
        } else {
            console.log(`Erro ao conectar no MongoDB: ${error}`);
        }
    });
});
