const express = require('express');
const routes = express.Router();
const Login = require('../src/controllers/LoginController');
const AssetController = require('../src/controllers/AssetController');

routes.post('/signin',Login.signIn);
routes.post('/asset',AssetController.Create);
routes.delete('/delete',AssetController.deleteAllAssets);

module.exports = routes;