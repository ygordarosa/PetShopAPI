const { pool } = require('../config');
const Pet = require('../classes/Pet')

const getPetDB = async () => {
  try{
    const {rows} = await pool.query(`SELECT * FROM pet ORDER BY id`);
    return rows.map((pet) => new Pet(pet.id, pet.nome, pet.dono));
  }catch(err){
    throw "Erro: " + err
  }
}

const addPetDB = async (body) => {
  try{
    const { nome, dono } = body;
    const results = await pool.query(`INSERT INTO pet (nome, dono) VALUES ($1, $2)
       returning id, nome, dono`, [nome, dono])
    const pet = results.rows[0]
    return new Pet(pet.id, pet.nome, pet.dono)
  }catch(err){
    throw "erro ao inserir pet no banco: " + err;
  }
}

const updatePetDB = async ( body ) => {
  try{
    const { id, nome, dono } = body;
    const results = await pool.query(`UPDATE pet set nome = $2, dono = $3 WHERE id = $1 
      returning id, nome, dono`,[id, nome, dono])
    if(results.rowCount == 0){
      throw `Não existe nenhum registro com o id ${id}`
    }
    const pet = results.rows[0]
    return new Pet(pet.id, pet.nome, pet.dono)
  }catch(err){
    throw "Erro no update de pet: " + err
  }
}


const deletePetDB = async ( id ) => {
  try{
    const results = await pool.query(`DELETE FROM pet WHERE id = $1`,[id])
    if ( results.rowCount == 0){
      throw `Não existe um registro com o id ${id}`;
    } else {
      return `Pet com id ${id} foi removida do sistema`
    }
  }catch(err){
    throw "Erro ai deletar uma pet: " + err
  }
}

const getPetPorIdDB = async ( id ) => {
  try {
    const results = await pool.query(`SELECT * FROM pet WHERE id = $1`,[id])
    if (results.rowCount == 0) {
      throw `Não existe um registro de pet com id ${id}`;
  } else{
    const pet = results.rows[0];
    return new Pet(pet.id, pet.nome, pet.dono)
  }
  }catch(err){
    throw "Erro ao buscar pet por codigo: " + err
  }
}


module.exports = {
  getPetDB, addPetDB, updatePetDB, deletePetDB, getPetPorIdDB
}