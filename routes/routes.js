const express = require('express');
const routes = express.Router();
const AssetController = require('../src/controllers/AssetController');
const UserController = require('../src/controllers/UserController');
const authMiddleware = require('../src/middleware/auth');

//Middleware jwt any routes except login
//routes.use(authMiddleware);

//Asset Routes
//routes.post('/asset',AssetController.Create);
routes.get('/asset',AssetController.ListAll);
routes.get('/asset/:id',AssetController.listById);

//Mobile Assets - Cars, Buses, etc
routes.get('/mobileassets',AssetController.listMobileAssets);

//Asset Error Reports
routes.get('/assetError',AssetController.countErrors);

//User Routes
routes.post('/user',UserController.Create);
//routes.post('/login/',UserController.signIn);
routes.get('/user',UserController.listAll);
routes.get('/user/:id',UserController.listById);
routes.put('/user/:id',UserController.updateUser);

module.exports = routes;