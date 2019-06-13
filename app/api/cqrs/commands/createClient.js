module.exports = require('cqrs-domain').defineCommand({
  name: 'createClient'
}, function (data, aggregate) {
  data.createdAt = new Date();
  aggregate.apply('clientCreated', data);
});