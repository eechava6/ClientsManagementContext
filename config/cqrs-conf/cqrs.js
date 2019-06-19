const KafkaProducer = require('../communication/producer');
const KafkaConsumer = require('../communication/consumer');
var domainConfig = require('./defs');;
var path = require("path");



//configurate domain
var domain = require('cqrs-domain')({
  domainPath: path.resolve('.') + '/app/api/cqrs/commands/',
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

const eventDenormalizerConfig = require('./eventDenormalizer-config')


var eventDenormalizerOptions = {
    denormalizerPath:  path.resolve('.') + '/app/api/cqrs/queries/',
    repository: eventDenormalizerConfig.repository,
    revisionGuardStore: eventDenormalizerConfig.revisionGuardStore
};

    const eventDenormalizer = require('cqrs-eventdenormalizer')(eventDenormalizerOptions);

    eventDenormalizer.defineEvent(eventDenormalizerConfig.eventDefinition);

    eventDenormalizer.init(function(err) {
        if(err) {
           return err
        }
        console.log("EventDenormalizer ready")

        domain.init(function(err) {
            if (err) {
                return err;
            }
            KafkaConsumer.startConsumer();
            console.log("Domain ready")
            domain.onEvent(function(evt) {
                if(evt.event !== "commandRejected"){
                    KafkaProducer.sendRecord(evt)
                    eventDenormalizer.handle(evt)
                }
            });
          });

    });



module.exports.domain = domain
module.exports.eventDenormalizer = eventDenormalizer