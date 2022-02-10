const knex = require('../conexao');
const bcrypt = require('bcrypt');
const cadastroUsuarioSchema = require('../validacoes/cadastroUsurioSchema');
const atualizarUsuarioSchema = require('../validacoes/atualizacaoUsuarioSchema');


const cadastraUsuario = async (req, res) => {
    const { nome, email, nome_empresa, senha } = req.body;

    try {
        await cadastroUsuarioSchema.validate(req.body);
        const quantidadesUsuarios = await knex('usuarios').where({ email }).first();

        if (quantidadesUsuarios) {
            return res.status(400).json({ mensagem: 'O email já existe' });
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada,
            nome_empresa
        }).returning('*');

        if (!usuario) {
            return res.status(400).json({ mensagem: 'O usuario não foi cadastrado' });
        }

        return res.status(200).json();

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario);
}

const atualizarPerfil = async (req, res) => {
    const { nome, nome_empresa, email, senha } = req.body;
    const { id } = req.usuario;
    if (!nome && !nome_empresa && !email && !senha) {
        return res.status(404).json({ mensagem: 'è necessário informar ao menos um campo para atualização' });

    }

    try {
        await atualizarUsuarioSchema.validate(req.body);
        const usuarioExiste = await knex('usuarios').where({ id }).first();
        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }
        if (senha) {
            senha = await bcrypt.hast(senha, 10);
        }

        if (email && email !== req.usuario.email) {
            const emailJaExiste = await knex('usuarios').where({ email }).first();
            if (emailJaExiste) {
                return res.status(404).json({ mensagem: 'O email já existe' });
            }
        }
        const usuarioAtualizado = await knex('usuarios').where({ id }).update({ nome, nome_empresa, email, senha });

        if (!usuarioAtualizado) {
            return res.status(400).json({ mensagem: 'O usuario não foi atualizado' });
        }

        return res.status(200).json({ mensagem: 'Usuario foi atualizado com sucesso' });


    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { cadastraUsuario, obterPerfil, atualizarPerfil }