var host = process.env.kafka+":9092"
module.exports = {
    kafka_products_topic: 'products',
    kafka_clients_topic: 'clients',
    kafkaHost: host,
}; 
