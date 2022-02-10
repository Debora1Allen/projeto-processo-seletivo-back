
const knex = require('../conexao');

const obterFornecedor = async (req, res) => {
    const { id } = req.params;
    try {
        const fornecedor = await knex('fornecedores').where({ id }).first();

        if (!fornecedor) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' })
        }

        return res.status(200).json(fornecedor);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}
const listarForncedores = async (req, res) => {
    const { limite_mínimo_kwh } = req.query;
    try {
        const fornecedor = await knex('fornecedores').where(query => {
            if (limite_mínimo_kwh) {
                return query.where('limite_mínimo_kwh', 'ilike', `%${limite_mínimo_kwh}%`)
            }
        });
        return res.status(200).json(fornecedor);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}
module.exports = {
    obterFornecedor, listarForncedores
}