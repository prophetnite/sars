// includes
// =======================
// get the packages we need ============
// =======================
var express 	=	require('express');
var path 		=	require('path');
var bodyParser  = 	require('body-parser');
var morgan      = 	require('morgan');
var mongoose    = 	require('mongoose');
var config 		= 	require('./config'); 			// get our config file
var app         =	express();




// =======================
// configuration =========
// =======================
var port = process.env.PORT || 1337; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// =======================
// use middleware
// =======================
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/assets', express.static('assets'));
app.use('/assets2', express.static('assets2'));
app.use(morgan('dev'));


// define routes
app.use(require('./router'))

// start the server
app.listen(port, function() { 
	console.log('Ready on port ' + port);
});
