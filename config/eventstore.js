var es = require('eventstore')({
    type: 'mongodb',
    host: 'localhost',                          // optional
    port: 27017,                                // optional
    dbName: 'eventstore',                       // optional
    eventsCollectionName: 'events',             // optional
    snapshotsCollectionName: 'snapshots',       // optional
    transactionsCollectionName: 'transactions', // optional
    timeout: 10000                              // optional
  });


  es.init(function (err) {
    console.log("Event Store ready")
  });

const eventStore = {
    addEvent:() => {
        es.getEventStream('clients', function(err, stream) {
            stream.addEvent(data);
            stream.commit(err,stream => {
              console.log(stream.eventsToDispatch); // this is an array containing all added events in this commit.
            });
          });
    }
}
  

  
module.exports = eventStore;