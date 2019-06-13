module.exports = require('cqrs-domain').defineEvent({
  name: 'clientUpdated'
},
function (data, aggregate) {
  aggregate.set(data);
});