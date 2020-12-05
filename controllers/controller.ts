import { Meme } from '../models/Meme';
import axios from 'axios';

export async function validateToken(req, res, next) {
    const { headers } = req;
    const { token } = headers;

    if (!token) {
        return res.send(403, { 'erro': 'Token não fornecido' });
    }


    const requestConfig = {
        headers
    };
    axios.post('https://ec021-av2-auth.herokuapp.com/auth/validateToken', {}, requestConfig)
        .then((response) => {
            console.log('1')
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
    return next();
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

    axios.post('https://ec021-av2-auth.herokuapp.com/auth/login', {
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
    const { titulo, descricao, ano } = req.body;

    const resposta = await Meme.create(
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
