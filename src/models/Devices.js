const mongoose = require('mongoose');

const DevicesSchema = mongoose.Schema({
    company : String,
    name : String,
    active : Boolean,
    type : String,
    model : String,
    order : [{
        code : String,
        description : String,
        destinationAddress : String,
        contact : String,
        delivered : Boolean,
        receivedBy : String,
        destination : {
            lat : String,
            lon : String
        },
        deadline : Date,    //Stablished time to deliver
        checkin : {         //Time which the package arrived at shipping company
            type : Date,    
        },     
        checkout : {        //Time which order was made
            type : Date,
        }
    }]
},{timestamps : true});

module.exports = mongoose.model('Devices',DevicesSchema);