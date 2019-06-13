//Imports User Model
const clientModel = require('../models/clients');
//Fs reads a file to later write it to user
const fs = require('fs');
module.exports = {
//Creates a new client with name and cc
 create: async(req) => {
      clientModel.create({ name: req.body.name, cc: req.body.cc }, function (err, result) {
      if (err){ 
         console.log("Error creating client : "+err)
         return res.json({status:"failed"})
         }else
         data = {cc: req.body.cc, type:"userCreated"}
         return res.json({status:"success"})
      });

 },

 //Updates a client CC and name via its cc
 update: async(req) => {
   newValues= {cc:req.body.cc, name:req.body.name}
  clientModel.updateOne({cc: req.body.cc },newValues, function (err, result) {
  if (err){ 
     console.log("Error updating user : "+err)
     return res.json({status:"failed"})
     }else
     data = {cc: req.body.cc, type:"userUpdated"}
     
     return res.json({status:"success"})
  });
},

//Deletes a client via its cc
delete: async(req) => {
  clientModel.deleteOne({cc: req.body.cc }, function (err, result) {
  if (err){ 
     console.log("Error deleting user : "+err)
     return res.json({status:"failed"})
     }else
     data = {cc: req.body.cc, type:"userDeleted"}
     
     return res.json({status:"success"})
  });
 },


 //Returns the clients found   
 findOne: async(req) => {
   clientModel.find({cc: req.body.cc },function (err, result) {
   if (err){ 
      console.log("Error getting data : "+err)
      return res.json({status:"failed"})
      }else
      data = {cc: req.body.cc, type:"userSearched"}
      
      return res.json({result})
   });
},

 //Returns the clients found   
 findAll: async(req) => {
   clientModel.find(function (err, result) {
   if (err){ 
      console.log("Error getting data : "+err)
      return res.json({status:"failed"})
      }else
      data = {cc: "0", type:"searchAllUsers"}
      return res.json({result})
   });
  },

  //If user logged previously : redirects to UserPage
//If user has not log in the system, loads registration page.
loadRegister: function(req) {
      fs.readFile('./app/views/index.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
    }
} 
