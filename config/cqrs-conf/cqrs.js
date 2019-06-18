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
const viewmodel = require('viewmodel')
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

        // on receiving an __event__ from eventDenormalizer module:
        //
        // - forward it to connected browsers via socket.io
        eventDenormalizer.onEvent(function(evt,err) {
            //console.log(evt)
           // io.sockets.emit('events', evt);
        });


        eventDenormalizer.onEventMissing(function (info, evt) {
            console.log("Missed event")
            console.log(evt)
        });

        domain.init(function(err) {
            if (err) {
                return err;
            }
            KafkaConsumer.startConsumer();
            console.log("Domain ready")
            domain.onEvent(function(evt) {
                KafkaProducer.sendRecord(evt)
                eventDenormalizer.handle(evt)
            });
          
          });

    });



module.exports.domain = domain
module.exports.eventDenormalizer = eventDenormalizer