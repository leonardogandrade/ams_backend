const express = require('express');
const routes = express.Router();
const AssetLogController = require('../src/controllers/AssetLogController');
const UserController = require('../src/controllers/UserController');
const authMiddleware = require('../src/middleware/auth');
const DevicesController = require('../src/controllers/DevicesController');
const DevicesTypeController = require('../src/controllers/DevicesTypeController');

//Middleware jwt any routes except login
//routes.use(authMiddleware);

//####### ASSETLOG ROUTES #######
routes.get('/asset',AssetLogController.ListAll);
routes.get('/asset/:id',AssetLogController.listById);

//Mobile Assets - Cars, Buses, etc
routes.get('/mobileassets',AssetLogController.listMobileAssets);
routes.post('/mobileassets/:mac',AssetLogController.listByMac);

//Asset Error Reports
routes.get('/assetError',AssetLogController.countErrors);

//####### Devices ROUTES #######
routes.post('/devices',DevicesController.create);
routes.get('/devices',DevicesController.listAll);

//####### DevicesType ROUTES #######
routes.post('/devicestype',DevicesTypeController.create);
routes.get('/devicestype',DevicesTypeController.listAll);

//####### Order ROUTES #######
routes.post('/order/:id',DevicesController.orderByDevice);
routes.get('/orderid',DevicesController.orderByOrderID);
routes.post('/orderid',DevicesController.updateOrderByOrderID); //Update order into order array by orderID
routes.post('/updateorder/:devname',DevicesController.updateOrder);

//####### Tracking ROUTES #######
routes.get('/tracking/:deviceName/:orderID',DevicesController.trackingOrder);

//####### USER ROUTES #######
routes.post('/user',UserController.Create);
//routes.post('/login/',UserController.signIn);
routes.get('/user',UserController.listAll);
routes.get('/user/:id',UserController.listById);
routes.put('/user/:id',UserController.updateUser);

module.exports = routes;