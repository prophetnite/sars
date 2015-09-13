// includes
var express 	=	require('express');
var path 		=	require('path');
var bodyParser 	=	require('body-parser');

var app = express();

// configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/assets', express.static('assets'));
app.use('/assets2', express.static('assets2'));

// define routes
app.use(require('./router'))

// start the server
app.listen(1337, function() { 
	console.log('Ready on port 1337');
});
