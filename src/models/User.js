const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    name : {
        type : String,
        required : true,
    },
    perfil : String,
    phone : String,
    company : String,
    role : String,
    department : String,
},{
    timestamps : true,
})

module.exports = mongoose.model('User',UserSchema);