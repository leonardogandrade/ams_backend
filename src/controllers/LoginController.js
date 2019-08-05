const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(userId){
    return jwt.sign({ id: userId },authConfig.secret,{ expiresIn : 86400 });   
}

module.exports = {
    async signIn(req,res){
        const {username,password} = req.body;
        const response = await User.findOne({username,password});

        if(response !== null ){
            token = generateToken(response._id);
            return res.send({token});
        }else
            return res.send({error : 'user doesnt exist.'});
    }
}