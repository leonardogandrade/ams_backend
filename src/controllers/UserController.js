const mongoose = require('mongoose');
const User = mongoose.model('User');
// const jwt = require('jsonwebtoken');
// const authConfig = require('../config/auth');

// function generateToken(userId){
//     return jwt.sign({ id: userId },authConfig.secret,{ expiresIn : 86400 });   
// }

module.exports = {
    async Create(req,res){
        try{
            const payload = await User.create(req.body);
            console.log('user created successfully.');
            //token = generateToken(payload._id);
            return res.send({payload});
        }catch(err){
            console.log(`Error while creating user - ${err}`);
        }
    },

    async listAll(req,res){
        try{
            const response = await User.find();
            return res.json(response);
        }catch(err){
            console.log(`Error while feching listAll users - ${err}`);
        }
    },

    async listById(req,res){
        try{
            const response = await User.findById(req.params.id);
            return res.json(response)
        }catch(err){
            console.log(`Error while fetching User by ID - ${err}`)
        }
    },

    async updateUser(req,res){
        try{
            const payload = await User.findByIdAndUpdate(req.params.id,req.body,{new : true});
            console.log('user updated successfully.');
            return res.json(payload);
        }catch(err){
            console.log(`Error while updating UserById - ${err}`)
        }
    },

    // async signIn(req,res){
    //     const {username,password} = req.body;
    //     const response = await User.findOne({username,password});
    //     if(response != ''){
    //         token = generateToken(response._id);
    //         return res.send({response,token});
    //     }else{
    //         res.status(400).send({error : 'user not found'});
    //     }
    // }
}
