import * as restify from 'restify';
const axios = require('axios');

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

server.post('/login', (req, res, next) => {
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

    return next();
});

server.listen(SERVER_PORT, () => {
    console.log('%s listening at %s', server.name, server.url);
});
