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

  
module.exports = es;