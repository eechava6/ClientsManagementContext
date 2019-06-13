//Imports
const express = require('express');
const bodyParser = require('body-parser')

//App imports
const clients = require('./routes/clients');
const config = require('./config/database'); //database configuration
const mongoose = require('mongoose');
const KafkaService = require('./config/communication/producer');
var domainConfig = require('./config/cqrs-conf/defs');;

//Creates the instance
const app = express();

//configurate domain
  var domain = require('cqrs-domain')({
      domainPath: __dirname + '/app/api/cqrs/',
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

//Connection to DB
mongoose.connect(config.db,{ useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});



app.use(bodyParser.urlencoded({
  extended: true
}));

//Redirect all '/' request  to authentication.
app.get('/', function(req, res){  
  res.send('Clients CRUD ');
});

//Statics (Styles and JS)
app.use(express.static(__dirname + '/public/'));

//Public routes
app.use('/', clients);

// Handle errors
app.use(function(err, req, res, next) {
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else
    if(err[0] && err[0].msg){
    res.status(500).json({message: "There was an error : " + err[0].msg});
    }
});

//Server listening at port 3000
app.listen(3000, function(){
	console.log('Node server listening on port 3000');
});