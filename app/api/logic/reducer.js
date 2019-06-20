var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const eventDenormalizer = require('../../../config/cqrs-conf/cqrs').eventDenormalizer;


function doSomething(query){
  MongoClient.connect(url, function(err, db) {
    var dbo2 = db.db("clientsQueries")
    dbo2.collection("clients").find(query).toArray(function(err,result2){
      if (err) throw err;

     evt.payload.payload.id = result2[0].id;
     eventDenormalizer.handle(evt.payload);

    })
  })
}

module.exports = {
  rebuild: function(){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("domain-clients");
      
      dbo.collection("events").find().toArray(function(err, result) {
        if (err) throw err;

        for(evt of result){
          if(evt.payload.event.toString() === "clientCreated"){
            eventDenormalizer.handle(evt.payload);
          }
        }
         
        for(evt of result){
          if(evt.payload.event.toString() !== "clientCreated"){
            var query = {cc: evt.payload.payload.cc}
            doSomething(query)
          }
        }
       db.close()
        return {status:"success"}
      });
    });
  }
}

