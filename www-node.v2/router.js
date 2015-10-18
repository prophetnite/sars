// --------------------- INCLUDES AND CONFIGURATION  ---------------------

// Includes
var express 	=	require('express');
var session 	= 	require('express-session')
var moment 		=	require('moment');
var fs 			=	require("fs");
var jwt    		=	require('jsonwebtoken'); 		// used to create, sign, and verify tokens
var router 		=	express.Router();

// DB Models
var User   		=	require('./models/user');
var Log_IP 		=	require('./models/log_ip');

//Configs
var config 		= 	require('./config'); 				// get our config file
var debug_login	= 	false;								//DEBUG QRZ
var debug_token = 	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiYWRtaW4iOnRydWUsIl9fdiI6MH0.uAE2igqxQbPT6CFFRskRCn-K-jOZYOTP5UtvBDG37Rc";

router.use(session({
  secret: config.secret_token_session,
  resave: false,
  saveUninitialized: false
}))
// --------------------- END INCLUDES AND CONFIGURATION  ---------------------






// --------------------- CORE SITE PAGES - PUBLIC ---------------------
// route to show version message (GET http://localhost:8080/api/)
router.get('/api', function (req, res) {
       res.json({ message: 'API v.01: use http://server:port/api/authenticate to receive acess token' });
});

router.get('/', function (req, res){
	res.redirect('/login');
});

router.get('/login', function (req, res){		
	if (req.session.token || debug_login){res.redirect('/dashboard')}
	res.render('pages/login');
});

router.get('/logout', function (req, res){
	req.session.destroy(function(err) {})
	res.redirect('/login');
});
// --------------------- END CORE SITE PAGES - PUBLIC ---------------------






// --------------------- API (MONGO) AUTHENTICATION ROUTES  ---------------------
// -- Everything after token verify requires authentication
router.post('/api/authenticate', function (req, res) {
  // find the user
  	User.findOne({
		name: req.body.name
	}, function(err, user) {
    	if (err) throw err;
	    if (!user) {
   			res.json({ success: false, message: 'Authentication failed. User not found.' });
    	} else if (user) {
      	// check if password matches
      	if (user.password != req.body.password) {
        	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      	} else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret_token_api, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        // return the information including token as JSON

        if (req.body.apitype == "web") {
        	req.session.username=req.body.name
        	req.session.token=token
        	res.json({"success":"true","message":"Enjoy your token!",token:token,"session":"true"});
        	// res.redirect('/dashboard')
        } else {

        	res.json({"success":"true","message":"Enjoy your token!",token:token,"session":"false"});
       }
      }   
    }
  });
});

// route middleware to verify a token
router.use(function (req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.session.token;

	console.log("\n\n----------------------------------------------------------")							// DEBUG QRZ
  	console.log("\ntoken:" + token, "\ndebug:" + debug_login, "\ndebug_token: " + debug_token)				//
  	if (!token && debug_login) {
  			console.log("\nDebug login ACTIVE");															//
  			token = debug_token}
  	console.log("\n-----------------------------------------------------------\n\n")						//

	// decode token
  	if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret_token_api	, function(err, decoded) {      // should be set to app.get('globalvar')
    	if (err) {
        	return res.json({ success: false, message: 'Failed to authenticate token.' });    
    	} else {
        	// if everything is good, save to request for use in other routes
        	req.decoded = decoded;    
        	next();
      	}	
    });
  	} else {
	    // if there is no token return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	}
});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/api/users', function (req, res) {
	User.find({}, function (err, users) {
		res.json(users);
	});
});   
// --------------------- END API (MONGO) AUTHENTICATION ROUTES  ---------------------






// ------------------SEMI PRIVATE -------------------------------------
router.get('/api/mongo/public/create', function (req, res) {	
	var trackip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		// Load tracking data to be logged 
	var ts_hms = moment().format('hh:mm:ss');
	var ts_ymd = moment().format('L');
	var fullheader = req.headers;

	if (req.session.username) {
		owner = req.session.username
	} else {
		owner = req.body.username
	}

	var log_ip = new Log_IP({ 
		"time":ts_hms,
        "date":ts_ymd,
        "ip":trackip,
        "host":req.headers['host'],
		"user-agent":req.headers['user-agent'],
        "accept":req.headers['accept'],
        "accept-language":req.headers['accept-language'],
        "accept-encoding":req.headers['accept-encoding'],
        "connection":req.headers['connection'],
        "owner":owner
	});
		console.log('---------------------------------------')
		console.log('\nUser: ' + owner + '\n\n')
		console.log(log_ip + '\n')
		console.log('---------------------------------------')

	log_ip.save(function(err) {
		if (err) throw err;
		console.log('Log_IP saved successfully');
    	res.json({ success: true });
	});
	//res.end('NSA tracking Database: Thanks for reporting in!');
})
// ------------------------------------------------------------------------------











// --------------------- API (JSON-MONGO) TEST SYSTEM  ---------------------
router.get('/api/mongo/create', function (req, res) {	
	var trackip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		// Load tracking data to be logged 
	var ts_hms = moment().format('hh:mm:ss');
	var ts_ymd = moment().format('L');
	var fullheader = req.headers;

	if (req.session.username) {
		owner = req.session.username
	} else {
		owner = req.body.username
	}

	var log_ip = new Log_IP({ 
		"time":ts_hms,
        "date":ts_ymd,
        "ip":trackip,
        "host":req.headers['host'],
		"user-agent":req.headers['user-agent'],
        "accept":req.headers['accept'],
        "accept-language":req.headers['accept-language'],
        "accept-encoding":req.headers['accept-encoding'],
        "connection":req.headers['connection'],
        "owner":owner
	});
		
		console.log('---------------------------------------')
		console.log('\nUser: ' + owner + '\n\n')
		console.log(log_ip + '\n')
		console.log('---------------------------------------')

	log_ip.save(function(err) {
		if (err) throw err;
		console.log('Log_IP saved successfully');
    	res.json({ success: true });
	});
	//res.end('NSA tracking Database: Thanks for reporting in!');
})

router.get('/api/mongo/read', function (req, res) {

	Log_IP.find({}, function (err, users) {
		res.json(users);
	});   
})

router.get('/api/mongo/read/:id', function (req, res) {
	var id = req.params.id 
	Log_IP.find({owner: id}, function (err, users) {
		res.json(users);
	});   
})

router.get('/api/mongo/update/:id', function (req, res) {
	var id = req.params.id 
	Log_IP.update({}, function (err, users) {
		res.json(users);
	});   
})

router.get('/api/mongo/delete/:id', function (req, res) {
	var id = req.params.id 
	Log_IP.findByIdAndRemove(id, function (err, users) {
		res.json(users);
	});   
})

// --------------------- END API (JSON-MONGO) TEST SYSTEM  ---------------------






// --------------------- CORE SITE PAGES - PRIVATE ---------------------
router.get('/dashboard', function (req, res){
	console.log('\nDashboard: Token: ' + req.session.token)																// #DEBUG QRZ
	
	//load data from DB here
	res.render('pages/dashboard', {
		pagetitle: 'Welcome to you Dashboard',
		user: [{
			username: req.session.username, 
			namefirst: "",
			namelast: "",
			title: "Security Engineer",
			email: 34,
			messages: 343}],
		token: req.session.token
	});
});
router.get('/log_ip', function (req, res){
	var iplog_db = loaddatabase('ip');
	//load data from DB here
	res.render('pages/log_ip', {
		pagetitle: "Live IP Log",
		loggedAddresses: iplog_db,
		username: req.session.username2
	});
});
router.get('/devices', function (req, res){
	//load data from DB here
	res.render('pages/devices', {
		pagetitle: 'Devices',
		user: userDetails
	});
});
router.get('/map', function (req, res){
	//load data from DB here
	res.render('pages/map', {
		pagetitle: 'Live Tracking MAP',
		user: userDetails
	});
});
router.get('/settings', function (req, res){
	//load data from DB here
	res.render('pages/settings', {
		pagetitle: 'Settings',
		user: userDetails
	});
});
router.get('/contacts', function (req, res){
	//load data from DB here
	res.render('pages/contacts', {
		pagetitle: 'Contacts',
		user: userDetails
	});
});
router.get('/about', function (req, res){
	//load data from DB here
	res.render('pages/about', {
		pagetitle: 'About us',
		user: userDetails
	});
});
//  --------------- END CORE SITE PAGES - PRIVATE -------------------







// --------------------- API (JSON-TEXT) TEST SYSTEM  ---------------------
router.get('/api/csv/create', function (req, res) {	
	var loggedAddresses = loaddatabase('ip');  											// Loading database function
	var trackip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		// Load tracking data to be logged 
	var ts_hms = moment().format('hh:mm:ss');
	var ts_ymd = moment().format('L');
	var fullheader = req.headers;

	loggedAddresses[Object.keys(loggedAddresses).length + 1] = {						// Update in memory data
		"time": ts_hms,
		"date": ts_ymd,
		"remoteAddress": trackip,
		"headers": fullheader	
	};
	console.log(loggedAddresses);														// #DEBUG QRZ CONSOLE LOGGING
	writedatabase(loggedAddresses, 'ip');

	res.end('NSA tracking Database: Thanks for reporting in!');
	//res.redirect('/log_ip');

})

router.get('/api/csv/read', function (req, res) {
	var loggedAddresses = loaddatabase('ip');
		for(var attributename in loggedAddresses){
    		console.log(attributename+": "+loggedAddresses[attributename]);
		}	
	res.end(JSON.stringify(loggedAddresses));
})

router.get('/api/csv/read/:id', function (req, res) {
	// First read existing users.
	id = loaddatabase('ip');
	var id = id[req.params.id] 
	console.log( id );														// DEBUG CONSOLE LOGGING
	res.end( JSON.stringify(id));
   
})

router.get('/api/csv/update', function (req, res) {
	var loggedAddresses = loaddatabase('ip');
	res.end(JSON.stringify('NOT YET IMPLEMENTED'));
})

router.get('/api/csv/delete/:id', function (req, res) {
	var loggedAddresses = loaddatabase('ip');
		console.log('total Length: ' + Object.keys(loggedAddresses).length);		// DEBUG CONSOLE LOGGING
	delete loggedAddresses[req.params.id];
    	console.log('after length: ' + Object.keys(loggedAddresses).length );		// DEBUG CONSOLE LOGGING
    write = writedatabase(loggedAddresses, 'ip');
	res.end(write);
})
// --------------------- END API (JSON-TEXT) TEST SYSTEM  ---------------------

module.exports = router;