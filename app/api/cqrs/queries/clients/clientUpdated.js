module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'clientUpdated',
  aggregate: 'clients',
  id: 'payload.id'
}, 'update');