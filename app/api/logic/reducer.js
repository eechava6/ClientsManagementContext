var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const eventDenormalizer = require('../../../config/cqrs-conf/cqrs').eventDenormalizer;

module.exports = {
  rebuild: async()=>{
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("domain-clients");
      //var query = {};
      dbo.collection("events").find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result)
        for(evt of result){
          eventDenormalizer.handle(evt.payload);
        }
        db.close();
        return {status:"success"}
      });
    });
  }
}

