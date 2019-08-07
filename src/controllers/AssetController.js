const mongoose = require('mongoose');
const Asset = mongoose.model('Asset');
const OneSignal = require('onesignal-node');
require('dotenv').config();

const myClient = new OneSignal.Client({      
    userAuthKey: process.env.ONESIGNAL_USER_AUTH_KEY,      
    app: { appAuthKey: process.env.ONESIGNAL_API_KEY, appId: process.env.ONESIGNAL_APP_ID }      
}); 

const city = '';

var firstNotification = new OneSignal.Notification({      
    contents: {      
        en: "Compressor de  excedeu o threshold.",      
        tr: "Test mesajı"      
    },
    //template_id : "7247767a-7741-4793-97fd-7cd7a6e0c127",
    include_player_ids : ["4d578444-c419-45f0-9b2f-87a212ab566a"]      
}); 

//firstNotification.postBody["included_segments"] = ["Active Users"];      
firstNotification.postBody["excluded_segments"] = ["Banned Users"]; 

firstNotification.postBody["data"] = {"Message": "Alert", "value": "Asset reached the threshold"};      
//firstNotification.postBody["send_after"] = 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)';

module.exports = {
    //Creating asset record.
    async Create(req,res){
        try{
            const payload = req.body
            await Asset.create(req.body);
            req.io.emit('assetPost',payload);

            if(req.body.value > 10){
                
                myClient.sendNotification(new OneSignal.Notification({      
                    contents: {      
                        en: `Compressor de ${req.body.name} apresentou o status de ${req.body.status}. excedendo o threshold.`,      
                        tr: "Test mesajı"      
                    },
                    //template_id : "7247767a-7741-4793-97fd-7cd7a6e0c127",
                    include_player_ids : ["4d578444-c419-45f0-9b2f-87a212ab566a"]      
                }), function (err, httpResponse,data) {      
                    if (err) {      
                        console.log('Something went wrong...');      
                    } else {      
                        console.log(data, httpResponse.statusCode);      
                    }      
                 });
            }

            console.log(payload);
            return res.json(payload);
        }catch(err){
            console.log(`Error while Creating assets: ${err}`);
        }
    }, 
    //List all assents limiting 20 records for page.
    async ListAll(req,res){
        try{
            const { page } = req.query;
            const response = await Asset.paginate({},{sort : '-createdAt'},{page , limit : 20});
            return res.json(response);
        }catch(err){
            console.log(`Error while fetching assets from mongoDB: ${err}`);
        }
    },

    async listById(req,res){
        const response = await Asset.findById(req.params.id);
        return res.json(response);
    },

    async deleteAllAssets(req,res){
        await Asset.remove({});
        req.io.emit('assetPost');
        return res.send();
    },

    async countErrors(req,res){
        const response = await Asset.find().countDocuments({status : 'error', mac : 'aaa1166'})
        return res.json(response);
    }

}
