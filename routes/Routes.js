const { Router } = require('express');
const { login } = require('../controllers/segurancaController');
const { routesPessoa } = require('./RoutePessoa')
const { routesPet} = require ('./RoutePet')

const routes = new Router();

routes.use(routesPessoa)
routes.use(routesPet)
routes.route("/login")
   .post(login)   

module.exports = routes;
