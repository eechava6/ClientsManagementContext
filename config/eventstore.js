var domain = require('./cqrs').domain

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


module.export = domain;