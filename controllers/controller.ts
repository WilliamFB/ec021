const Meme = require('../models/Meme');
import axios from 'axios';

export function validateToken(req, res, next) {

    const { token } = req.headers;

    if (token == undefined)
        return res.send(403, { 'erro': 'Token não fornecido' });


    const headersConfig = {
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

export async function login(req, res) {
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

export async function createMeme(req, res) {
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

export async function editMeme(req, res) {
    const { titulo, descricao, ano } = req.body;
    const { id } = req.params;

    await Meme.findByIdAndUpdate(id, { titulo, descricao, ano }, (err, memes) => {
        if (err) return console.error(err);
    });

    await Meme.findById(id, (err, memes) => {
        if (err) return console.error(err);

        return res.json(200, memes);
    });
}

export async function listMemes(req, res) {
    const { id } = req.params;

    if (id) {
        // List por id
        await Meme.findById(id, (err, memes) => {
            if (err) return console.error(err);

            return res.json(200, memes);
        });
    } else {
        // List todos
        await Meme.find((err, memes) => {
            if (err) return console.error(err);

            return res.json(200, memes);
        });
    }
}

export async function deleteMeme(req, res) {
    const { id } = req.params;

    await Meme.findOneAndDelete({ _id: id }, (err, memes) => {
        if (err) return console.error(err);

        return res.json(204, memes);
    });
}
