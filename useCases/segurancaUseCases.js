
const { pool } = require('../config')
const Conta = require('../classes/Conta')

const autenticaContaDB = async (body) => {
    try {           
        const { cpf, senha } = body
        const results = await pool.query(`SELECT * FROM conta WHERE cpf = $1 AND senha = $2`,
        [cpf, senha]);
        if (results.rowCount == 0) {
            throw "CPF ou senha são inválidos";
        }
        const conta = results.rows[0];
        return new Conta(conta.cpf, conta.tipo, conta.nome);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

module.exports = {
    autenticaContaDB
}