module.exports = require('cqrs-domain').defineEvent({
  name: 'clientCreated'
},
function (data, aggregate) {
  aggregate.set(data);
});