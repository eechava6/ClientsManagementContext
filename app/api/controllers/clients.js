//Imports User Model
const clientModel = require('../models/clients');

module.exports = {

//Creates a new client with name and cc
 create: function(req, res, next) {
      clientModel.create({ name: req.body.name, cc: req.body.cc }, function (err, result) {
      if (err){ 
         console.log("Error creating user : "+err)
         return res.json({status:"failed"})
         }else
         console.log(result)
         return res.json({status:"success"})
      });
 },

 //Updates a client CC and name via its cc
 update: function(req, res, next) {
   newValues= { cc:req.body.cc, name:req.body.name}
  clientModel.updateOne({cc: req.body.cc },newValues, function (err, result) {
  if (err){ 
     console.log("Error updating user : "+err)
     return res.json({status:"failed"})
     }else
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
     return res.json({status:"success"})
  });
 }
} 
