const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoDB = process.env.MONGODB;

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


//MongoDB
try{
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.MONGODB,{useNewUrlParser : true});
    console.log('MongoDB connection was successfuly stablished.');
}catch(err){
    console.log(`Error trying mongoDB connection - ${err}`);
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(express.json());


//Models
requireDir('./src/models');

//Websocket
app.use((req,res,next) =>{
    req.io = io;
    next();
})

//Routes
app.use('/api',require('./routes/routes'));
app.use('/login',require('./routes/authenticate'));

server.listen(process.env.PORT || 3002);
console.log(`server is listenning.`);