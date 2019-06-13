module.exports = require('cqrs-domain').defineAggregate({
  // optional, default is last part of path name
  name: 'clients',
  
  // optional, default ''
  defaultCommandPayload: 'payload',
  
  // optional, default ''
  defaultEventPayload: 'payload',

  // optional, default ''
  defaultPreConditionPayload: 'payload',
});