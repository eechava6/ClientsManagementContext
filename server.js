//Imports
const express = require('express');
const bodyParser = require('body-parser')




//App imports
const clients = require('./routes/clients');
var es = require('./config/eventstore');
const config = require('./config/database'); //database configuration
const mongoose = require('mongoose');

//Creates the instance
const app = express();


//Connection to DB
mongoose.connect(config.db,{ useNewUrlParser: true });
var db = mongoose.connection;
console.log(config.db)
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

app.use(bodyParser.urlencoded({
  extended: true
}));


es.init(function (err) {

  es.getEventStream('0', function(err, stream) {
    stream.addEvent({ my: 'event' });
    stream.addEvents([{ my: 'event2' }]);
  
    stream.commit();
  
    // or
  
    stream.commit(function(err, stream) {
      console.log(stream.eventsToDispatch); // this is an array containing all added events in this commit.
    });
  });
});

//Redirect all '/' request  to authentication.
app.get('/', function(req, res){  
  res.send('Clients CRUD ');
});

//Statics (Styles and JS)
app.use(express.static(__dirname + '/public/'));

//Public routes
app.use('/clients', clients);

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