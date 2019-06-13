module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'clientDeleted',
  aggregate: 'clients',
  id: 'payload.id'
}, 'delete');