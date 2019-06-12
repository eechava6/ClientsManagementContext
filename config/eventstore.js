var domain = require('cqrs-domain')({
  // the path to the "working directory"
  // can be structured like
  // [set 1](https://github.com/adrai/node-cqrs-domain/tree/master/test/integration/fixture/set1) or
  // [set 2](https://github.com/adrai/node-cqrs-domain/tree/master/test/integration/fixture/set2)
  domainPath: '/path/to/my/files',

  // optional, default is 'commandRejected'
  // will be used if an error occurs and an event should be generated
  commandRejectedEventName: 'rejectedCommand',

  // optional, default is 800
  // if using in scaled systems and not guaranteeing that each command for an aggregate instance
  // dispatches to the same worker process, this module tries to catch the concurrency issues and
  // retries to handle the command after a timeout between 0 and the defined value
  retryOnConcurrencyTimeout: 1000,

  // optional, default is 100
  // global snapshot threshold value for all aggregates
  // defines the amount of loaded events, if there are more events to load, it will do a snapshot, so next loading is faster
  // an individual snapshot threshold defining algorithm can be defined per aggregate (scroll down)
  snapshotThreshold: 1000,

  // optional, default is in-memory
  // currently supports: mongodb, redis, tingodb, azuretable and inmemory
  // hint: [eventstore](https://github.com/adrai/node-eventstore#provide-implementation-for-storage)
  eventStore:{
      type: 'mongodb',
      host: 'localhost',                          // optional
      port: 27017,                                // optional
      dbName: 'eventosClientes',                       // optional
      eventsCollectionName: 'eventos',             // optional
      snapshotsCollectionName: 'snapshots',       // optional
      transactionsCollectionName: 'transacciones', // optional
      timeout: 10000                              // optional
    },

  /*// optional, default is in-memory
  // currently supports: mongodb, redis, tingodb, couchdb, azuretable, dynamodb and inmemory
  // hint settings like: [eventstore](https://github.com/adrai/node-eventstore#provide-implementation-for-storage)
  aggregateLock: {
    type: 'redis',
    host: 'localhost',                          // optional
    port: 6379,                                 // optional
    db: 0,                                      // optional
    prefix: 'domain_aggregate_lock',            // optional
    timeout: 10000                              // optional
    // password: 'secret'                          // optional
  },*/

  /*// optional, default is not set
  // checks if command was already seen in the last time -> ttl
  // currently supports: mongodb, redis, tingodb and inmemory
  // hint settings like: [eventstore](https://github.com/adrai/node-eventstore#provide-implementation-for-storage)
  deduplication: {
		type: 'redis',
		ttl: 1000 * 60 * 60 * 1, // 1 hour          // optional
		host: 'localhost',                          // optional
		port: 6379,                                 // optional
		db: 0,                                      // optional
		prefix: 'domain_aggregate_lock',            // optional
		timeout: 10000                              // optional
		// password: 'secret'                          // optional
  },*/

  // optional, default false
  // resolves valid file types from loader extensions instead of default values while parsing definition files
  useLoaderExtensions: true
});

/*var es = require('eventstore')({
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
  

  
module.exports = eventStore;*/

domain.defineCommand({
  // optional, default is 'id'
  id: 'id',

  // optional, default is 'name'
  name: 'name',

  // optional, default is 'aggregate.id'
  // if an aggregate id is not defined in the command, the command handler will create a new aggregate instance
  aggregateId: 'aggregate.id',

  // optional, only makes sense if contexts are defined in the 'domainPath' structure
  context: 'context.name',

  // optional, only makes sense if aggregates with names are defined in the 'domainPath' structure
  aggregate: 'aggregate.name',

  // optional, but recommended
  payload: 'payload',

  // optional, if defined the command handler will check if the command can be handled
  // if you want the command to be handled in a secure/transactional way pass a revision value that matches the current aggregate revision
  revision: 'revision',

  // optional, if defined the command handler will search for a handle that matches command name and version number
  version: 'version',

  // optional, if defined theses values will be copied to the event (can be used to transport information like userId, etc..)
  meta: 'meta'
});

domain.defineEvent({
  // optional, default is 'correlationId'
  // will use the command id as correlationId, so you can match it in the sender
  correlationId: 'correlationId',

  // optional, default is 'id'
  id: 'id',

  // optional, default is 'name'
  name: 'name',

  // optional, default is 'aggregate.id'
  aggregateId: 'aggregate.id',

  // optional, only makes sense if contexts are defined in the 'domainPath' structure
  context: 'context.name',

  // optional, only makes sense if aggregates with names are defined in the 'domainPath' structure
  aggregate: 'aggregate.name',

  // optional, default is 'payload'
  payload: 'payload',

  // optional, default is 'revision'
  // will represent the aggregate revision, can be used in next command
  revision: 'revision',

  // optional
  version: 'version',

  // optional, if defined the values of the command will be copied to the event (can be used to transport information like userId, etc..)
  meta: 'meta',

  // optional, if defined the commit date of the eventstore will be saved in this value
  commitStamp: 'commitStamp',

  // optional, if defined and the eventstore db implemntation supports this the position of the event in the eventstore will be saved in this value
  position: 'position'
});

domain.idGenerator(function (callback) {
  setTimeout(function () {
    var id = require('uuid').v4().toString();
    callback(null, id);
  }, 50);
});

domain.aggregateIdGenerator(function (callback) {
  setTimeout(function () {
    var id = require('uuid').v4().toString();
    callback(null, id);
  }, 50);
});

/////////////// ***************************************************** //////////////
/////////////// ******************** CONTEXTOS ******************** ////////////////
/////////////// ***************************************************** //////////////

require('cqrs-domain').defineContext({
  name: 'contextoGestionDeClientes'
})

/////////////// ***************************************************** //////////////
/////////////// ******************** AGREGADOS ******************** ////////////////
/////////////// ***************************************************** //////////////

require('cqrs-domain').defineAggregate({
  // optional, default is last part of path name
  name: 'cliente',

  /*// optional, default 0
  version: 3,*/

  /*// optional, default ''
  defaultCommandPayload: 'payload',*/

  /*// optional, default ''
  defaultEventPayload: 'payload',*/

  /*// optional, default ''
  defaultPreConditionPayload: 'payload',*/

  /*// optional, default false
  // by skipping the history, only the last event will be loaded and defaultly not applyed (just to ensure the revision number increment)
  skipHistory: true,*/

  /*// optional, default false
  // only optionally needed when skipHistory is set to true, only the last event will be loaded and applyed
  applyLastEvent: true,*/

  /*// optional, default false
  // will publish the events but will not commit them to the eventstore
  disablePersistence: false*/
},

/*// optionally, define some initialization data...
{
  emails: ['default@mycomp.org'],
  phoneNumbers: []
}*/)

// optionally, define snapshot need algorithm...
.defineSnapshotNeed(function (loadingTime, events, aggregateData) {
  // loadingTime is the loading time in ms of the eventstore data
  // events are all loaded events in an array
  // aggregateData represents the aggregateData after applying the resulting events
  return events.length >= 200;
})

////////  NO ESTOY SEGURO SI ES NECESARIO /////////////////////
// optionally, define if snapshot should be ignored
// if true, the whole event stream will be loaded
.defineIgnoreSnapshot({
  version: 0
}, function (data) {
  return true;
})
//.defineIgnoreSnapshot({
//  version: 0
//}, true)
//.defineIgnoreSnapshot({
//  version: 0
//}) // default true

/*// optionally, define conversion algorithm for older snapshots
// always convert directly to newest version...
// when loaded a snapshot and it's an older snapshot, a new snapshot with same revision but with newer aggregate version will be created
.defineSnapshotConversion({
  version: 1
}, function (data, aggregate) {
  // data is the snapshot data
  // aggregate is the aggregate object

  aggregate.set('emails', data.emails);
  aggregate.set('phoneNumbers', data.phoneNumbers);

  var names = data.name.split(' ');
  aggregate.set('firstname', names[0]);
  aggregate.set('lastname', names[1]);
})*/

/////////////// ***************************************************** //////////////
/////////////// ******************** COMANDOS ********************* ////////////////
/////////////// ***************************************************** //////////////

domain.defineCommand({
 // optional, default is file name without extension
 name: 'crearCliente',

 // optional, default 0
 version: 1,

 // optional, if not defined it will use what is defined as default in aggregate or pass the whole command
 payload: 'payload',

 // optional, default undefined
 // if true, ensures the aggregate to exists already before this command was handled
 // if false, ensures the aggregate to not exists already before this command was handled
 existing: true
}, function (data, aggregate) {
 // data is the command data
 // aggregate is the aggregate object

 // if (aggregate.get('someAttr') === 'someValue' && aggregate.has('special')) { ... }

 aggregate.apply('clienteCreado', data);
 // or
 // aggregate.apply('enteredNewPerson', data, version);
 // or
 // aggregate.apply({
 //   event: 'enteredNewPerson',
 //   payload: data
 // });
})

/*// if defined it will load all the requested event streams
// useful if making bigger redesigns in domain and you need to handle a command on a new aggregate
.defineEventStreamsToLoad(function (cmd) {
 return [{ // order is new to old
   context: 'hr',
   aggregate: 'mails',
   aggregateId: cmd.meta.newAggId
 },{
   context: 'hr',
   aggregate: 'persons',
   aggregateId: cmd.aggregate.id
 }];
});*/

domain.defineCommand({
  name: 'actualizarCliente',
  version: 1,
  payload: 'payload',
  existing: true},
  function (data, aggregate){
  aggregate.apply('clienteActualizado', data);
  })

domain.defineCommand({
  name: 'eliminarCliente',
  version: 1,
  payload: 'payload',
  existing: true},
  function (data, aggregate){
  aggregate.apply('clienteEliminado', data);
  })

/////////////// ***************************************************** //////////////
/////////////// ********************* EVENTOS ********************* ////////////////
/////////////// ***************************************************** //////////////

domain.defineEvent({
// optional, default is file name without extension
name: 'clienteCreado',

// optional, default 0
version: 1,

// optional, if not defined it will use what is defined as default in aggregate or pass the whole event...
payload: 'payload'
},
// passing a function is optional
function (data, aggregate) {
// data is the event data
// aggregate is the aggregate object

aggregate.set('cc', data.cc);
aggregate.set('name', data.name);
// or
// aggregate.set(data);
});

domain.defineEvent({
  name: 'clienteActualizado',
  version: 1,
  payload: 'payload'
  },
  function(data, aggregate){
    if(data.cc){
      aggregate.set('cc', data.cc);
    }
    if(data.name){
      aggregate.set('name', data.name);
    }
  });

domain.defineEvent({
  name: 'clienteEliminado',
  version: 1,
  payload: 'payload'
  },
  function(data, aggregate){
  ///////////////// NO ESTOY SEGURO SI ES ASÍ ////////////////////
    aggregate.delete({cc: data.cc});
  });

domain.init();

module.export = domain;