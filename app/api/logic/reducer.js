var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo-server:27017/";
const eventDenormalizer = require('../../../config/cqrs-conf/cqrs').eventDenormalizer;

module.exports = {
  rebuild: function(){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("domain-clients");
      
      dbo.collection("events").find().toArray(function(err, result) {
        if (err) throw err;
        for(evt of result){
          evt.payload.payload.id = result[0].id;
          eventDenormalizer.handle(evt.payload);
        }
        db.close()
        return {status:"success"}
      });
    });
  }
}

