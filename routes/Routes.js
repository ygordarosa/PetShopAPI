const { Router } = require('express');

const { routesPessoa } = require('./RoutePessoa')
const { routesPet} = require ('./RoutePet')

const routes = new Router();

routes.use(routesPessoa)
routes.use(routesPet)

module.exports = routes;
