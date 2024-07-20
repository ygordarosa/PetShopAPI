const { Router } = require('express')
const { getPessoa, addPessoa, updatePessoa, 
  deletePessoa, getPessoaPorId } = require('../controllers/pessoaController')

  const routesPessoa = new Router()

routesPessoa.route('/pessoa')
            .get(getPessoa)
            .post(addPessoa)
            .put(updatePessoa)

routesPessoa.route('/pessoa/:id')
            .get(getPessoaPorId)
            .delete(deletePessoa)


module.exports = { routesPessoa }