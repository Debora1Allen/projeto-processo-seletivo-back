const knex = require('../conexao');
const jwt = require('jsonwebtoken');

const filtroLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const usuarioExiste = await knex('usuarios').where({ id }).first();
        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }

        const { senha, ...usuario } = usuarioExiste;

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = filtroLogin;