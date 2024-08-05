const { Router } = require('express')
const { getPessoa, addPessoa, updatePessoa, 
  deletePessoa, getPessoaPorId } = require('../controllers/pessoaController')
const { verificaJWT } = require('../controllers/segurancaController')
const routesPessoa = new Router()

routesPessoa.route('/pessoa')
            .get(getPessoa)
            .post(verificaJWT, addPessoa)
            .put(verificaJWT, updatePessoa)

routesPessoa.route('/pessoa/:id')
            .get(verificaJWT, getPessoaPorId)
            .delete(verificaJWT, deletePessoa)


module.exports = { routesPessoa }