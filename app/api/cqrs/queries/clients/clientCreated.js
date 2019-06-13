module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'clientCreated',
  aggregate: 'clients',
  id: 'payload.id'
}, 'create');