import { Meme } from '../models/Meme';
import axios from 'axios';

// Middleware que irá checar se o token é válido
export async function validateToken(req, res, next) {
    const { token } = req.headers;

    if (!token) {
        return res.send(403, { 'erro': 'Token não fornecido' });
    }

    const requestConfig = {
        headers: { token }
    };

    // Requisição enviada ao auth server para verificação do token -> usando o axios
    await axios.post('https://ec021-av2-auth.herokuapp.com/auth/validateToken', {}, requestConfig)
        .then((response) => {
            if (response.status == 401) {
                return res.send(401, { 'erro': 'Token inválido' });
            }

            return next();
        })
        .catch((error) => {
            if (error.response.status == 401) {
                return res.send(401, { 'erro': 'Token inválido' });
            }
        });
}

// Middleware para verificar o body da requisição
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

// Requisição de login
export async function login(req, res) {
    const { body } = req;
    const { username, password } = body;

    // Requisição feita ao auth server, este irá retornar um token caso o login e senha sejam válidos
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

// Requisição para criação do meme
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

// Requisição para editar o meme do id fornecido no req.params
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

// Requisição que lista um meme por id ou todos os memes
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

// Requisição para deletar o meme
export async function deleteMeme(req, res) {
    const { id } = req.params;

    await Meme.findOneAndDelete({ _id: id }, (err, memes) => {
        if (err) {
            return console.error(err);
        }

        return res.json(204, memes);
    });
}
