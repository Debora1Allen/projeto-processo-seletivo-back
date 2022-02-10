const yup = require('./yup');

const atualizacaoUsuarioSchema = yup.object().shape({
    nome: yup.string(),
    nome_empresa: yup.string(),
    email: yup.string().email(),
    senha: yup.string()

});

module.exports = atualizacaoUsuarioSchema;