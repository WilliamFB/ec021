const Router = require('restify-router').Router;
import { createMeme, deleteMeme, editMeme, listMemes, login, validateToken,  } from './controllers/controller';

const instanciaRouter = new Router();

instanciaRouter.post('/login', login);
instanciaRouter.post('/meme', validateToken, createMeme);
instanciaRouter.patch('/meme/:id', validateToken, editMeme);
instanciaRouter.get('/meme/:id', validateToken, listMemes);
instanciaRouter.del('/meme/:id', validateToken, deleteMeme);

module.exports = instanciaRouter;