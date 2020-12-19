import { Meme, ModelMeme } from '../models/Meme';
import axios from 'axios';

require('dotenv').config()

export async function validateToken(req, res, next) {
    const { headers } = req;
    const { token } = headers;

    if (!token) {
        return res.send(403, { 'erro': 'Token não fornecido' });
    }

    const requestConfig = {
        headers: { token }
    };

    axios.post(process.env.URL_VALIDATE_TOKEN, {}, requestConfig)
        .then((response) => {
            if (response.status == 401) {
                return res.send(401, { 'erro': 'Token inválido' });
            }

            return next();
        })
        .catch((error) => {
            if (error.status == 401) {
                return res.send(401, { 'erro': 'Token inválido' });
            }
        });

}

export function validateBody(req, res, next) {
    const { body } = req;

    if (isNotNullUndefined(body)) {
        next();
    } else {
        res.send(403, { erro: 'Body não fornecido' });
    }

    function isNotNullUndefined(obj: Object) {
        return obj !== null && obj !== undefined;
    }
}

export async function login(req, res) {
    const { body } = req;
    const { username, password } = body;

    axios.post(process.env.URL_LOGIN, {
        username,
        password
    })
        .then((response) => {
            return res.json(response.status, response.data);
        })
        .catch((error) => {
            return res.json(error.response.status, error.response.data);
        });
}

export async function createMeme(req, res) {
    const meme: ModelMeme = req.body;
    const resposta = await Meme.create(
        meme
    );

    return res.json(201, resposta);
}

export async function editMeme(req, res) {
    const memeFieldsToEdit: ModelMeme = req.body;
    const { id } = req.params;

    await Meme.findByIdAndUpdate(id, memeFieldsToEdit, (err, memes) => {
        if (err) {
            return console.error(err);
        }
    });

    await Meme.findById(id, (err, memes) => {
        if (err) {
            return console.error(err);
        }

        return res.json(200, memes);
    });
}

export async function listMemes(req, res) {
    const { id } = req.params;

    if (id) {
        // List por id
        await Meme.findById(id, (err, memes) => {
            if (err) {
                return console.error(err);
            }

            return res.json(200, memes);
        });
    } else {
        // List todos
        await Meme.find((err, memes) => {
            if (err) {
                return console.error(err);
            }

            return res.json(200, memes);
        });
    }
}

export async function deleteMeme(req, res) {
    const { id } = req.params;

    await Meme.findOneAndDelete({ _id: id }, (err, memes) => {
        if (err) {
            return console.error(err);
        }

        return res.json(204, memes);
    });
}
