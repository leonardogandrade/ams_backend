const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const AssetSchema = mongoose.Schema({
    mac : String,   //Unique ID from device
    name : String,  //Human identification of device    
    type : String,  //
    value : Number,
    status : String,
    lastRepair : Date,
    nextRepair : Date,
    hourmeter : Number,
    pression : Number,
    temp : Number,
    active : Boolean,
    coord : {
        lat : String,
        lon : String,
    },   
},{
    timestamps : true,
});

AssetSchema.plugin(mongoosePaginate);

mongoose.model('Asset',AssetSchema); 