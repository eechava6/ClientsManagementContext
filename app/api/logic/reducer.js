var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const eventDenormalizer = require('../../../config/cqrs-conf/cqrs').eventDenormalizer;

module.exports = {
  rebuild: function(){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("domain-clients");
      //var query = {};
      dbo.collection("events").find().toArray(function(err, result) {
        if (err) throw err;
        for(evt of result){
          //console.log(evt.payload.event)
          if(evt.payload.event !== "createdClient"){
            var dbo2 = db.db("readmodel")
            var query = {cc: evt.payload.payload.cc}
            dbo2.collection("clients").find().toArray(function(err, result2){
              if (err) throw err;
              /*console.log("*** inicia comunicado ***")
              console.log(evt.payload.event)
              console.log(query)
              console.log(result2)
              console.log("*** fin comunicado ***")*/
              evt.payload.payload.id = result[0].id;
              eventDenormalizer.handle(evt.payload);
            })
          }else{
            //console.log("entra")
            eventDenormalizer.handle(evt.payload);
            //console.log("ya creo")
          }
        }
        //db.close();
        return {status:"success"}
      });
    });
  }
}






/*//Imports User Model
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
} */
