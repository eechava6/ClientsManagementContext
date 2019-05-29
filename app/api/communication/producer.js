const kafka = require('kafka-node');
const config = require('./config');


const Producer = kafka.Producer;
const client = new kafka.KafkaClient(config.kafka_server);
const producer = new Producer(client);

producer.on('ready', async function() {
    console.log("Kafka broker ready")
});

producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
});
  


  module.exports.producer = producer
  module.exports.config = config