var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // used to see requests
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose=require('mongoose');
var config = require('./config');
app.set('strict routing',true);
 app.set('case sensitive routing',true);
 app.set('env','development');
 app.enable('trust proxy');
 app.use(cookieParser());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 app.use(express.static(__dirname + '/public'));
 app.use(express.static(__dirname + '/views'));
 

 app.set('view  engine', 'ejs'); // set up ejs for templating
 //app.set('view  engine', 'html');


 app.use(morgan('dev'));

 mongoose.connect(config.database);
 const locationController=require('./controller/locationController');
app.get('/addLocation', function(req,res){

	//res.sendFile('../views/addLocation.html');
	res.sendFile(path.join(__dirname + '/views/addLocation.html'));
});
app.post('/addLocation',locationController.addLocation);
app.get('/locations',locationController.getLocations);
app.get('/search',function(req,res){
	res.render('./searchPlace.ejs');
});
app.post('/search',locationController.searchLocation);

//app.post('/create',messageController.createMessage);

app.listen(config.port);
console.log('Magic happens on port ' + config.port);