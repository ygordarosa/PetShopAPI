const { Router } = require('express');

const { routePessoa } = require('./RoutePessoa')
const { routePet} = require ('./RoutePet')

const routes = new Router();

routes.use(routePessoa)
routes.use(routePet)

module.exports = routes;
