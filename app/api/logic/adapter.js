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
/*

*********COMANDS*********

*/
//Creates a new client with name and cc
 create: async(req, res, next) => {
     console.log("Create")
     data = {name: req.body.name, cc: req.body.cc }
     commandHandler(data,'createClient')
     return res.json({status:"success"})
 },

 //Updates a client CC and name via its cc
 update: async(req, res, next) => {
   console.log("Update")
   dataS = {cc:req.body.cc,newName:req.body.newName}
   commandHandler(dataS,'updateClient')
   return res.json({status:"success"})
},

//Deletes a client via its cc
delete: async(req, res, next) => {
   console.log("Delete")
   data = {cc:req.body.cc}
   commandHandler(data,'deleteClient')
   return res.json({status:"success"})
 },

 /*

*********QUERIES*********

*/

 //Returns the clients found   
 findOne: async(req, res, next) => {
 
},

 //Returns the clients found   
 findAll: async(req, res, next) => {
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
