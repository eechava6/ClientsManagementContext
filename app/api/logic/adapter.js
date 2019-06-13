//Imports User Model

const domain = require('../../../config/cqrs-conf/cqrs')
const clientReducer = require('./reducer');
const uuid4 = require('uuid4');
//Fs reads a file to later write it to user
const fs = require('fs');

function commandHandler(data,command){
    domain.handle({
       id: uuid4(),
       command: command,
       aggregate: {
       name: 'clients'
       },
       payload: data
    }, err => {
       if(err){
          console.log(err)
       }
  }) ;
}


module.exports = {
//Creates a new client with name and cc
 create: async(req, res, next) => {
     data = {name: req.body.name, cc: req.body.cc }
     commandHandler(data,'createClient')
     return res.json({status:"success"})
 },

 //Updates a client CC and name via its cc
 update: async(req, res, next) => {
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
delete: async(req, res, next) => {
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
 findOne: async(req, res, next) => {
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
 findAll: async(req, res, next) => {
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
loadRegister: function(req, res, next) {
      fs.readFile('./app/views/index.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
    }
} 
