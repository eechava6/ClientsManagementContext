module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'clientsChanged',
  aggregate: 'category',
  id: 'payload.id'
}, 'update');