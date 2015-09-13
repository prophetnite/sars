var express = require('express');
var moment = require('moment');
var fs = require("fs");
			  
var router = express.Router();

var userDetails = [{ 
		namefirst: "Lord",
		namelast: "_ASDF",
		title: "Security Engineer",
		email: 34,
		messages: 343}];

var ipadd = {
		"time":"12:08:00",
        "date":"9/12/15",
        "ip":"localhost",
        "host":"localhost:1337",
        "user-agent":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:40.0) Gecko/20100101 Firefox/40.0",
        "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language":"en-US,en;q=0.5",
        "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language":"en-US,en;q=0.5",
        "accept-encoding":"gzip, deflate",
        "connection":"keep-alive"}

function writedatabase(data, db_type){
	fs.writeFile( __dirname + "/" + "iplog_db_" + db_type + ".json", JSON.stringify(data), function (err) {		
			if (err) return console.log(err);											// ERROR CONSOLE LOGGING
	});
}

function loaddatabase(db_type) {
	var db;
	try {
		database = fs.readFileSync( __dirname + "/" + "iplog_db_" + db_type + ".json", 'utf8');
	} catch (e) {
		console.log('Read file error: ' + e);
	}
	return JSON.parse(database);
}

// --------------------- API TEST SYSTEM  ---------------------
router.get('/api/version' || '/api', function (req, res) {
       res.end( 'API v. .01 Alpha' );
});

router.get('/api/create', function (req, res) {	
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
	console.log(loggedAddresses);														// DEBUG CONSOLE LOGGING
	writedatabase(loggedAddresses, 'ip');

	res.end('NSA tracking Database: Thanks for reporting in!');
	//res.redirect('/log_ip');

})
router.get('/api/read', function (req, res) {
	var loggedAddresses = loaddatabase('ip');
	res.end(JSON.stringify(loggedAddresses));
})
router.get('/api/read/:id', function (req, res) {
	// First read existing users.
	id = loaddatabase('ip');
	var id = id[req.params.id] 
	console.log( id );														// DEBUG CONSOLE LOGGING
	res.end( JSON.stringify(id));
   
})
router.get('/api/update', function (req, res) {
	var loggedAddresses = loaddatabase('ip');
	res.end(JSON.stringify('NOT YET IMPLEMENTED'));
})

router.get('/api/delete/:id', function (req, res) {
	var loggedAddresses = loaddatabase('ip');
		console.log('total Length: ' + Object.keys(loggedAddresses).length);		// DEBUG CONSOLE LOGGING
	delete loggedAddresses[req.params.id];
    	console.log('after length: ' + Object.keys(loggedAddresses).length );		// DEBUG CONSOLE LOGGING
    write = writedatabase(loggedAddresses, 'ip');
	res.end(write);
})
// --------------------- END API TEST SYSTEM  ---------------------



// --------------------- CORE SITE PAGES ---------------------

router.get('/', function (req, res){
	var iplog_db = loaddatabase('ip');
	//load data from DB here
	res.render('pages/index', {
		pagetitle: 'Welcome to you Dashboard',
		user: userDetails
	});
});
router.get('/log_ip', function (req, res){
	var iplog_db = loaddatabase('ip');
	//load data from DB here
	res.render('pages/log_ip', {
		pagetitle: "Live IP Log",
		loggedAddresses: iplog_db,
		user: userDetails
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

//  --------------- END CORE SITE PAGES -------------------
router.post('/add', function (req, res) {
	//var newItem = req.body.newItem;

	var trackip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	ts_hms = moment().format('hh:mm:ss');
	ts_ymd = moment().format('L');
	
	loggedAddresses.push({
		id: loggedAddresses.length + 1,
		time: ts_hms,
		date: ts_ymd,
		ip: trackip	
	});

	res.redirect('/log_ip');
});

router.post('/delete', function (req, res) {
	var delItem = req.body.delItem;

	console.log('ITEM TO DELETE ' + delItem);   // CONSOLE
	console.log(loggedAddresses[delItem]);	    // CONSOLE
	loggedAddresses.splice(delItem, 1);
	console.log(loggedAddresses[delItem]);		// CONSOLE
	
	res.redirect('/log_ip');
});

module.exports = router;