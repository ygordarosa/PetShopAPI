const { pool } = require('../config');
const Pessoa = require('../classes/Pessoa')

const getPessoaDB = async () => {
  try{
    const {rows} = await pool.query(`SELECT * FROM pessoa ORDER BY id`);
    return rows.map((pessoa) => new Pessoa(pessoa.id, pessoa.nome, pessoa.cpf));
  }catch(err){
    throw "Erro: " + err
  }
}

const addPessoaDB = async (body) => {
  try{
    const { nome, cpf } = body;
    const results = await pool.query(`INSERT INTO pessoa (nome, cpf) VALUES ($1, $2)
       returning id, nome, cpf`[nome, cpf])
    const pessoa = results.rows[0]
    return new Pessoa(pessoa.id, pessoa.nome, pessoa.cpf)
  }catch(err){
    throw "erro ao inserir pessoa no banco: " + err;
  }
}

const updatePessoaDB = async ( body ) => {
  try{
    const { id, nome, cpf } = body;
    const results = await pool.query(`UPDATE pessoa set nome = $2, cpf = $3 WHERE id = $1 
      returning id, nome, cpf`,[id, nome, cpf])
    if(results.rowCount == 0){
      throw `Não existe nenhum registro com o id ${id}`
    }
    const pessoa = results.rows[0]
    return new Pessoa(pessoa.id, pessoa.nome, pessoa.cpf)
  }catch(err){
    throw "Erro no update de pessoa: " + err
  }
}


const deletePessoaDB = async ( id ) => {
  try{
    const results = await pool.query(`DELETE FROM pessoa WHERE id = $1`,[id])
    if ( results.rowCount == 0){
      throw `Não existe um registro com o id ${id}`;
    } else {
      return `Pessoa com id ${id} foi removida do sistema`
    }
  }catch(err){
    throw "Erro ai deletar uma pessoa: " + err
  }
}

const getPessoaPorIdDB = async ( id ) => {
  try {
    const results = await pool.query(`SELECT * FROM pessoa WHERE id = $1`[id])
    if (results.rowCount == 0) {
      throw `Não existe um registro de pessoa com id ${id}`;
  } else{
    const pessoa = results.rows[0];
    return new Pessoa(pessoa.id, pessoa.nome, pessoa.cpf)
  }
  }catch(err){
    throw "Erro ao buscar pessoa por codigo: " + err
  }
}


module.exports = {
  getPessoaDB, addPessoaDB, updatePessoaDB, deletePessoaDB, getPessoaPorIdDB
}