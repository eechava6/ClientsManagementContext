const domain = require('../../../config/cqrs-conf/cqrs').domain;
const clientModel = require('../models/clients');
const uuid4 = require('uuid4');
//Fs reads a file to later write it to user
const fs = require('fs');
const executer = require('./reducer')

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
 create: function(req, res, next) {
     console.log("Create")
     data = {name: req.body.name, cc: req.body.cc, products:[req.body.product], done:1 }
     commandHandler(data,'createClient')
     if(res)
     return res.json({status:"success"})
 },

 //Updates a client CC and name via its cc
 update: function(req, res, next) {
   clientModel.find({cc:req.body.cc}, (err,result) => 
   { 
      if(result.length > 0){
        console.log("Update")
        data = {cc:req.body.cc,name:req.body.newName, id:JSON.parse(JSON.stringify(result[0])).id}
        commandHandler(data,'updateClient')
        if(res)
        return res.json({status:"success"})
      }else{
        if(res)
        return res.json({status: "failed"})
      }
   }) 
},

addProduct: function(req, res, next){
   clientModel.find({cc:req.body.cc}, (err,result) => 
   {  
      console.log("AddProduct")
      if(result[0]){
         client = JSON.parse(JSON.stringify(result[0]))
         items = client.products
         items.push(req.body.type)
         data = {cc:req.body.cc,name:client.name, products:items, id:client.id}
         commandHandler(data,'updateClient')
         if(res)
         return res.json({status:"success"})
      }else{
        if(res)
        return res.json({status:"failed"})
      }
      
   })
   
},

deleteProduct: function(req, res, next){
   clientModel.find({cc:req.body.cc}, (err,result) => 
   {  
      console.log("DeleteProduct")
      if(result[0]){
         client = JSON.parse(JSON.stringify(result[0]))
         items = client.products
         var index = items.indexOf(req.body.type)
         if (index > -1) {
           items.splice(index, 1);
         }
         data = {cc:req.body.cc,name:client.name, products:items, id:client.id}
         commandHandler(data,'updateClient')
         if(res)
         return res.json({status:"success"})
      }else{
        if(res)
        return res.json({status:"failed"})
      }
      
   })
   
},

updateProduct: function(req, res, next){
  clientModel.find({cc:req.body.cc}, (err,result) =>
  {
    if(result.length > 0){
      console.log("AddProduct")
      client = JSON.parse(JSON.stringify(result[0]))
      items = client.products
      var index = items.indexOf(req.body.oldType)
      items[index]= req.body.type
      data = {cc:req.body.cc,name:client.name, products:items, id:client.id}
      commandHandler(data,'updateClient')
      if(res)
      return res.json({status:"success"})
    }else{
      if(res)
      return res.json({status:"failed"})
    }
   })
   
},

//Deletes a client via its cc
delete: function(req, res, next) {
  clientModel.find({cc:req.body.cc}, (err,result) =>
  {
    if(result.length > 0){
      console.log("Delete")
      data = {cc:req.body.cc, id:JSON.parse(JSON.stringify(result[0])).id}
      commandHandler(data,'deleteClient')
      if(res)
      return res.json({status:"success"})
    } else {
      console.log("Delete failed");
      if(res)
      return res.json({status: "failed"})
    }
   }) 
 },

 /*

*********QUERIES*********

*/

 //Returns the clients found   
 findOne: function(req, res, next) {
   clientModel.find({cc:req.body.cc}, (err,result) => 
   { 
      console.log("findOne")
      return res.json(result)
   }) 
},

 //Returns the clients found   
 findAll: function(req, res, next) {
   clientModel.find((err,result) => 
   { 
      console.log("findAll")
      return res.json(result)
   }) 
  },

//If user logged previously : redirects to UserPage
//If user has not log in the system, loads registration page.
  loadRegister: function(req, res, next) {
    fs.readFile('./app/views/create.html',function (err, data){
      res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
      res.write(data);
      res.end();
    })
  },

    loadDelete: function(req, res, next) {
      fs.readFile('./app/views/delete.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
    },

    loadUpdate: function(req, res, next) {
      fs.readFile('./app/views/update.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
    },
    
    loadFindOne: function(req, res, next) {
      fs.readFile('./app/views/find.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
    },

  rebuild: function(req, res, next) {
    result = executer.rebuild();
    return res.json(result);
  },

  productsOfClient: function(req, res, next) {
    clientModel.find({cc: req.body.cc}, (err, result) => {
      if (err) throw err;
      if(result.length > 0){
        return res.json(JSON.parse(JSON.stringify(result[0])).products)
      }else{
        return res.json({})
      }
    })
  }
} 
