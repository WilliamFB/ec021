import * as restify from 'restify';
import * as mongoose from 'mongoose';
import {instanciaRouter as router} from './router';
import {DB_CONFIG, DB_URL} from './database';

require('dotenv').config()

const server = restify.createServer();

router.applyRoutes(server);


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(process.env.PORTA, () => {
    console.log('%s listening at %s', server.name, server.url);

    mongoose.connect(DB_URL, DB_CONFIG, function (error) {
        if (!error) {
            console.log(`MongoDB Conectado`);
        } else {
            console.log(`Erro ao conectar no MongoDB: ${error}`);
        }
    });
});
