const express = require('express');
const routes = express.Router();
const User = require('../src/controllers/UserController');
const AssetController = require('../src/controllers/AssetLogController');

routes.post('/signin',User.signIn);
routes.post('/asset',AssetController.Create);
routes.delete('/delete',AssetController.deleteAllAssets);

module.exports = routes;