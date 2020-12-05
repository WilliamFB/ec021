import * as restify from 'restify';
const mongoose = require('mongoose');
const router = require('./router');

const SERVER_PORT = 8080;

const server = restify.createServer();

router.applyRoutes(server);

const DB = require('./database');

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

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
