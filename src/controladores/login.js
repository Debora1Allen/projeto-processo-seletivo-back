const knex = require('../conexao');
const bcrypt = require('bcrypt');
const loginSchema = require('../validacoes/loginSchema');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        await loginSchema.validate(req.body);
        const usuario = await knex('usuarios').where({ email }).first();
        if (!usuario) {
            return res.status(404).json({ mensagem: 'O usuario não foi encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email e senha não conferem' });
        }
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '8h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        })

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = { login };
