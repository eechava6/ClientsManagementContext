var domainConfig = require('./defs');;

//configurate domain
  var domain = require('cqrs-domain')({
      domainPath: '/app/api/cqrs/',
      eventStore: {
          type: 'mongodb',
          host: 'localhost',                          // optional
          port: 27017,                                // optional
          dbName: 'domain-clients',                      // optional
          eventsCollectionName: 'events',             // optional
          snapshotsCollectionName: 'snapshots',       // optional 
          transactionsCollectionName: 'transactions', // optional
          timeout: 10000                              // optional
      },
  });
  
  domain.defineCommand(domainConfig.commandDefinition);
  domain.defineEvent(domainConfig.eventDefinition);

  domain.eventStore.on('connect', err =>{
    if(err){
      console.log(err)
    }
    console.log("EventStore ready")
  }) 

module.exports = domain