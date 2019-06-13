module.exports = require('cqrs-domain').defineEvent({
  name: 'clientDeleted'
},
function (data, aggregate) {
  aggregate.destroy();
});