const mongoose = require('mongoose');
const DevicesType = mongoose.model('DevicesType');

module.exports = {
    async create(req,res){
        const payload = await DevicesType.create(req.body);
        console.log(payload);
        res.json(payload);
    },
    async listAll(req,res){
        const response = await DevicesType.find();
        console.log(response);
        res.json(response);
    },

}