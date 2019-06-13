module.exports = require('cqrs-domain').defineCommand({
  name: 'createClient'
}, function (data, aggregate) {
  console.log(data)
  data.createdAt = new Date();
  aggregate.apply('clientCreated', data);
});