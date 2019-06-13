const KafkaService = require('../communication/producer');
var domainConfig = require('./defs');;
var path = require("path");

//configurate domain
var domain = require('cqrs-domain')({
  domainPath: path.resolve('.') + '/app/api/cqrs/',
  eventStore: domainConfig.eventStore
});

domain.defineCommand(domainConfig.commandDefinition);
domain.defineEvent(domainConfig.eventDefinition);

domain.eventStore.on('connect', err =>{
if(err){
  return err
}
console.log("EventStore ready")
}) 

domain.init(function(err) {
  if (err) {
      return err;
  }
  console.log("Domain ready")
  domain.onEvent(function(evt) {
      KafkaService.sendRecord(evt)
  });

});

module.exports = domain