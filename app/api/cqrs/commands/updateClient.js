module.exports = require('cqrs-domain').defineCommand({
  name: 'updateClient'
}, function (data, aggregate) {
  aggregate.apply('clientUpdated', data);
});