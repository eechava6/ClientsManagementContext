//Imports User Model
const clientModel = require('../models/clients');
const KafkaService = require('../communication/producer');





module.exports = {
//Creates a new client with name and cc
 create: function(req, res, next) {
      clientModel.create({ name: req.body.name, cc: req.body.cc }, function (err, result) {
      if (err){ 
         console.log("Error creating client : "+err)
         return res.json({status:"failed"})
         }else
         data = {cc: req.body.cc, type:"userCreated"}
         KafkaService.sendRecord(data)
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
     data = {cc: req.body.cc, type:"userCreated"}
     KafkaService.sendRecord(data)
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
     data = {cc: req.body.cc, type:"userCreated"}
     KafkaService.sendRecord(data)
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
      data = {cc: req.body.cc, type:"userCreated"}
      KafkaService.sendRecord(data)
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
      data = {cc: req.body.cc, type:"userCreated"}
      KafkaService.sendRecord(data)
      return res.json({result})
   });
  }
} 
