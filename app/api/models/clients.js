const mongoose = require('mongoose');

//Define a schema for Clients
const Schema = mongoose.Schema;
const ClientSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 },
 cc: {
  type: String,
  trim: true,
  required: true
 }
}, { collection : 'clients' });


module.exports = mongoose.model('Client', ClientSchema);