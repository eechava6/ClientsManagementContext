const domain = require('cqrs-domain')({
    domainPath: './eventstore.js',
  
    eventStore: {
        type: 'mongodb',
        host: 'localhost',                          // optional
        port: 27017,                                // optional
        dbName: 'eventosClientes',                       // optional
        eventsCollectionName: 'eventos',             // optional
        snapshotsCollectionName: 'snapshots',       // optional
        transactionsCollectionName: 'transacciones', // optional
        timeout: 10000                              // optional
      },
  
  });

const context = require('cqrs-domain').defineContext({
    name: 'contextoGestionDeClientes'
  })


const aggregate = require('cqrs-domain').defineAggregate({
    // optional, default is last part of path name
    name: 'cliente',
  },
)

domain.init( warnings => {
    console.log("Domain ready")
});
 
domain.eventStore.init( err =>{
    console.log("EventStore ready")
})

  module.exports.domain = domain
  module.exports.aggregate = aggregate
  module.exports.context = context