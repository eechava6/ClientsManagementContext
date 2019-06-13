module.exports = require('cqrs-domain').defineCommand({
  name: 'updateClient'
}, function (data, aggregate) {
  console.log(data)
  aggregate.apply('clientUpdated', data);
});