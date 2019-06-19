var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const eventDenormalizer = require('../../../config/cqrs-conf/cqrs').eventDenormalizer;

module.exports = {
  rebuild: function(){
    console.log("entra")
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("domain-clients");
      //var query = {};
      dbo.collection("events").find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result)
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

