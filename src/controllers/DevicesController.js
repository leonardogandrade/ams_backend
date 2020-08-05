const mongoose = require('mongoose');
const Devices = mongoose.model('Devices');
const Mail = require('./Mail');
require('dotenv').config();

let tracking_address = `${process.env.APP_ADDRESS}/tracking/car_04/delivery10001`
let contact = 'general.andrade@gmail.com'

module.exports = {
    async create(req,res){
        const payload = await Devices.create(req.body);
        res.json(payload._id);
    },

    async trackingOrder(req,res){
        const devName = req.params.deviceName;
        const orderID = req.params.orderID;
        let orderData;

        const {_id : devID} = await Devices.findOne({'name' : {$eq : devName}})

        const {order} = await Devices.findById(devID);

        order.filter((value,index)=>{
            if(value.code == orderID){
                orderData = value;
            }
        });
        
        console.log(orderData);
        res.json(orderData);
    },

    async updateOrder(req,res){
        const deviceName = req.params.devname;
        const updatedData = req.body;
        updatedData.filter((data)=>{
            if((data.checkout != null) && !data.delivered){
                Mail.sendNotification(data.contact,`${process.env.APP_ADDRESS}/tracking/${deviceName}/${data.code}`,`AMS - Acompanhe seu pedido - ${data.code}`)
            }
        })
        const response = await Devices.findOneAndUpdate({'name' : deviceName},{order : updatedData});
        res.json(response);
    },

    async orderByDevice(req,res){
        const deviceID = req.params.id;
        const response = await Devices.findOne({'name' : {$eq : deviceID}})
        const {order} = response;
        res.json(order);
    },

    async orderByOrderID(req,res){
        const deviceID = req.query.dv;
        const orderID =  req.query.ord;
        const response = await Devices.findOne({'name' : {$eq : deviceID}})
        const {order} = response
        const order_ = order.filter((order) =>{
            return order.code === orderID
        });
        res.json(order_);
    },
    async updateOrderByOrderID(req,res){
        const deviceID = req.query.dv;
        const orderID =  req.query.ord;
        const payload = req.body;
        const response = await Devices.findOne({'name' : {$eq : deviceID}})
        const {order} = response
        let orderIndexToUpdate;

        order.filter((order,index) =>{
            if(order.code === orderID){
                orderIndexToUpdate = index;
            }
        });
        
        order[orderIndexToUpdate] = payload;
        const updatedOrderArray = await Devices.findOneAndUpdate({'name' : deviceID},{order});
        res.json(updatedOrderArray);
    },

    async listAll(req,res){
        const response = await Devices.find();
        console.log(response);
        res.json(response);
    },

}

// async delOrder(req,res){
//     const {orderID,deviceName} = req.body;
//     let del_index;

//     const {order} = await Devices.findOne({
//         'name' : {$eq : deviceName}
//     });

//     order.filter((value,index)=>{
//         if(value._id == orderID){
//             del_index = index;
//         }
//     });

//     order.splice(del_index,1);
//     const response = await Devices.findOneAndUpdate({'name' : deviceName},{order});
//     res.json(response);
// },

// async addOrder(req,res){
//     const devName = req.params.devName;
//     const {_id : devID} = await Devices.findOne({'name' : {$eq : devName}})

//     const {code,description,destination,deadline,checkin,checkout,destinationAddress} = req.body;
//     const {order} = await Devices.findById(devID);

//     order.push({code,description,destination,deadline,checkin,checkout,destinationAddress});
    
//     const response = await Devices.findOneAndUpdate(devName,{
//         order : order
//     });
    
//     console.log(response);
//     res.json(response);
// },