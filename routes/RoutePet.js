const { Router } = require('express')
const { getPet, addPet, updatePet, 
  deletePet, getPetPorId } = require('../controllers/petController')
const { verificaJWT } = require('../controllers/segurancaController')
const routesPet = new Router()

routesPet.route('/pet')
            .get(verificaJWT, getPet)
            .post(verificaJWT, addPet)
            .put(verificaJWT, updatePet)

routesPet.route('/pet/:id')
            .get(verificaJWT, getPetPorId)
            .delete(verificaJWT, deletePet)


module.exports = { routesPet }