var domainConfig = require('./config/domain-config');;

//configurate domain
  var domain = require('cqrs-domain')({
      domainPath: __dirname + '/app/api/cqrs/',
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
    console.log("EventStore connected")
  }) 

  domain.init(function(err) {
      if (err) {
          return err;
      }
      console.log("Cargado")
      // on receiving a message (__=command__) from msgbus pass it to 
      // the domain calling the handle function
      // on receiving a message (__=event) from domain pass it to the msgbus
      domain.onEvent(function(evt) {
          console.log("hola")
      });

    
      domain.handle({
        id: '3b4d44b0-34fb-4ceb-b212-68fe7a7c2f70',
        command: 'createClient',
        aggregate: {
          name: 'clients'
        },
        payload: {
          name: 'Jack',
          parent: "jack2"
        }
      }, err => {
          if(err){
            console.log(err)
          }
      }) ;

  });

