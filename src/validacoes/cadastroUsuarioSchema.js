const yup = require('./yup');

const cadastroUsuarioSchema = yup.object().shape({
    nome: yup.string().required(),
    nome_empresa: yup.string().required(),
    email: yup.string().required(),
    senha: yup.string().min(8).required(),
});

module.exports = cadastroUsuarioSchema;