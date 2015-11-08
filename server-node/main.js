// ==== FILE: main.js ====

// ======================================================
// =    Main server initialization script
// ======================================================




// ======================================================
// INCLUDE CORE PACKAGES
// ======================================================
var express 	=	require('express'),
	https 		= 	require('https'),
	fs 			= 	require('fs'),
	path 		=	require('path'),
	bodyParser  = 	require('body-parser'),
	morgan      = 	require('morgan'),
	mongoose    = 	require('mongoose'),
	moment 		=	require('moment'),
	jwt    		=	require('jsonwebtoken'),		// used to create, sign, and verify tokens
	session 	= 	require('express-session'),
	app         =	express();

		//session 		= 	global.session;
// ======================================================




// ======================================================
// INCLUDE DATABASE MODELS
// ======================================================
	GLOBAL.User   		=	require('./models/user'),
	GLOBAL.log_track 	=	require('./models/log_track'),
	GLOBAL.log_backup 	=	require('./models/log_backup');
// ======================================================




// ======================================================
// INCLUDE CONFIG SETTINGS
// ======================================================
	GLOBAL.config 		= 	require('./config'); 				// get our config file
	GLOBAL.debug_login	= 	true;								//DEBUG QRZ
	GLOBAL.debug_token 	= 	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiYWRtaW4iOnRydWUsIl9fdiI6MH0.uAE2igqxQbPT6CFFRskRCn-K-jOZYOTP5UtvBDG37Rc";

	router 	=	express.Router();

	router.use(session({
	  secret: config.secret_token_session,
	  resave: false,
	  saveUninitialized: false
	}))
// ======================================================




// ======================================================
// SETUP CORE SERVER
// ======================================================
var key  	= 	fs.readFileSync('/sslkeys/nes-ssl-priv-key.pem')
var cert 	= 	fs.readFileSync('/sslkeys/nes-ssl-cert.pem')
var port 	= 	process.env.PORT || 443; // used to create, sign, and verify tokens

mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// ======================================================




// ======================================================
// USE MIDDLEWARE
// ======================================================
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/assets', express.static('assets'));
app.use('/assets2', express.static('assets2'));
app.use(morgan('dev'));
// ======================================================




// ======================================================
// SETUP ROUTES
// ======================================================
app.use(require('./routes/pages_public'))
app.use(require('./routes/api_public'))
app.use(require('./routes/api_auth'))
app.use(require('./routes/pages_private'))
app.use(require('./routes/api_private'))
// ======================================================




// ======================================================
https.createServer({
    key: key,
    cert: cert
}, app).listen(port);
// ======================================================
