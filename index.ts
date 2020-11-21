import * as restify from 'restify';

const SERVER_PORT = 8080;
 
const server = restify.createServer();
 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
    res.send('ola moço');

    return next();
});
 
server.get('/alo/:name', (req, res, next) => {
    res.send('alo ' + req.params.name);
    return next();
});

server.post('/alo', (req, res, next) => {
    const body = req.body;
    if (body && body.name) {
        res.send(`fala tu ${body.name}`);
    } else {
        res.send(500);
    }

    return next();
});

server.listen(SERVER_PORT, () => {
  console.log('%s listening at %s', server.name, server.url);
});