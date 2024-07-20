const { Router } = require('express')
const { getPet, addPet, updatePet, 
  deletePet, getPetPorId } = require('../controllers/petController')

  const routesPet = new Router()

routesPet.route('/pet')
            .get(getPet)
            .post(addPet)
            .put(updatePet)

routesPet.route('/pet/:id')
            .get(getPetPorId)
            .delete(deletePet)


module.exports = { routesPet }