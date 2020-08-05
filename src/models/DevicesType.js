const mongoose = require('mongoose');

const DevicesTypeSchema = mongoose.Schema({
    name : String,      //vehicle, sensor, computer
},{timestamps : true});

module.exports = mongoose.model('DevicesType',DevicesTypeSchema);