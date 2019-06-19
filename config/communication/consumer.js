const kafka = require('kafka-node');
const config = require('./config');
const reducer = require('./reducer')


const client = new kafka.KafkaClient(config.kafka_server);

module.exports = {
  startConsumer: function(){
    let consumer = new kafka.Consumer(
      client,
      [{ topic: config.kafka_products_topic, partition: 0 }],
      {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: "buffer",
        fromOffset: false
      }
    );


    consumer.on('error', function(err) {
      if(err){
        console.log('error', err);
      }
    });

    consumer.on('message', async function(message) {
      // Read string into a buffer.
      var buf = new Buffer.from(message.value, "binary");
      var decodedMessage = JSON.parse(buf.toString());
      const clientsAdapter = require('../../app/api/logic/adapter');
      reducer.reduceEvents(decodedMessage.event,decodedMessage.payload,clientsAdapter)
    })
  }
};
