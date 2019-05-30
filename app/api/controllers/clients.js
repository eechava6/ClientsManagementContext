//Imports User Model
const clientModel = require('../models/clients');
const comm = require('../communication/producer');


function generateEvent(event){
  payload = [
    {
      topic: comm.config.kafka_topic,
      messages: event
    }
  ];

  comm.producer.send(payload, (err, data) => {
    if (err) {
      console.log('error sending to Kafka');
    } else {
      console.log(event);
    }
  });
}


module.exports = {
//Creates a new client with name and cc
 create: function(req, res, next) {
      clientModel.create({ name: req.body.name, cc: req.body.cc }, function (err, result) {
      if (err){ 
         console.log("Error creating client : "+err)
         return res.json({status:"failed"})
         }else
         generateEvent("clientCreated " + req.body.cc)
         return res.json({status:"success"})
      });

 },

 //Updates a client CC and name via its cc
 update: function(req, res, next) {
   newValues= {cc:req.body.cc, name:req.body.name}
  clientModel.updateOne({cc: req.body.cc },newValues, function (err, result) {
  if (err){ 
     console.log("Error updating user : "+err)
     return res.json({status:"failed"})
     }else
     generateEvent("clientUpdated " + req.body.cc)
     return res.json({status:"success"})
  });
},

//Deletes a client via its cc
delete: function(req, res, next) {
  clientModel.deleteOne({cc: req.body.cc }, function (err, result) {
  if (err){ 
     console.log("Error deleting user : "+err)
     return res.json({status:"failed"})
     }else
     generateEvent("clientDeleted " + req.body.cc)
     return res.json({status:"success"})
  });
 },


 //Returns the clients found   
 findOne: function(req, res, next) {
   clientModel.find({cc: req.body.cc },function (err, result) {
   if (err){ 
      console.log("Error getting data : "+err)
      return res.json({status:"failed"})
      }else
      generateEvent("clientSearched " + req.body.cc)
      return res.json({result})
   });
},

 //Returns the clients found   
 findAll: function(req, res, next) {
   clientModel.find(function (err, result) {
   if (err){ 
      console.log("Error getting data : "+err)
      return res.json({status:"failed"})
      }else
      generateEvent("listAllClients")
      return res.json({result})
   });
  }
} 
