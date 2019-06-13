module.exports = require('cqrs-domain').defineCommand({
  name: 'deleteClient'
}, function (data, aggregate) {
  aggregate.apply('clientDeleted', data);
});