// ==== FILE: api_private.js ====

// ===============================================
// = API (JSON-MONGO) TEST SYSTEM
// ===============================================
var moment 	  =	 require('moment');
var fs 		  =  require('fs');
var filename  =  '../agents/agent-linux/agent_checkin.sh';
// === END API TEST ==============================




// ===============================================
// = API (JSON-MONGO) TRACKER LOGGER 
// ===============================================
router.get('/api/v1/log/track/post', function (req, res) {
	var trackip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		// Load tracking data to be logged
	var ts_hms = moment().format('hh:mm:ss');
	var ts_ymd = moment().format('L');
	var fullheader = req.headers;
	var owner = req.session.username || req.body.username || "";
	
	var track = new log_track({
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
		console.log(log_track + '\n')
		console.log('---------------------------------------')

	track.save(function(err) {
		if (err) throw err;
		console.log('log_track saved successfully');
    	res.json({ success: true });
	});
	//res.end('NSA tracking Database: Thanks for reporting in!');
})

router.get('/api/v1/log/track/', function (req, res) {
	log_track.find({}, function (err, users) {
		res.json(users);
	});
})

router.get('/api/v1/log/track/:username', function (req, res) {
	var username = req.params.username
	log_track.find({owner: username}, function (err, users) {
		res.json(users);
	});
})
																																				// SYSTEM CODE: QRZ
																																				//
router.get('/api/v1/log/track/put/:id', function (req, res) {									// CODE AS SAMPLE ONLY
	var id = req.params.id 																								// NO NEED TO UPDATE OR DELETE IP_LOG
	log_track.update({}, function (err, users) {															//
		res.json(users);																										//
	});   																																//
})																																			//

router.get('/api/v1/log/track/delete/:id', function (req, res) {							//
	var id = req.params.id 																								//
	log_track.findByIdAndRemove(id, function (err, users) {									//
		res.json(users);																										//
	});   																																//
})																																			//
// ====== END API (JSON-MONGO) TRACKER LOGGER ===============================




// ===============================================
// = API (JSON-MONGO) Backup System Logger
// ===============================================
router.get('/api/v1/log/backup', function (req, res) {
	log_backup.find({}, function (err, users) {
		res.json(users);
	});
})

router.get('/api/v1/log/backup/get/:username', function (req, res) {
	var username = req.params.username
	log_backup.find({username: username}, function (err, users) {
		res.json(users);
	});
});


router.get('/api/v1/log/backup/checkin', function (req, res) {

	var dev_deviceid = req.body.deviceid || req.query.deviceid || "";
	var dev_serial = req.body.serial || req.query.serial || "";
	var dev_epoch = (new Date).getTime();
	var dev_store_free = req.body.storefree || req.query.storefree || "";
	var dev_ts_hms = moment().format('hh:mm:ss');
	var dev_ts_ymd = moment().format('L');
	var dev_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		// Load tracking data to be logged
	var dev_host = req.headers['host'];
	var dev_connection = req.headers['connection'];
	var dev_other = "";
	var dev_username = req.body.username || req.query.username || "";
	

	var backup = new log_backup({
		"deviceid":dev_deviceid,
	    "serial":dev_serial,
		"epoch":dev_epoch,
		"store_free":dev_store_free,
		"time":dev_ts_hms,
        "date":dev_ts_ymd,
        "ip":dev_ip,
        "host":dev_host,
		"connection":dev_connection,
    	"other":dev_other,
        "username":dev_username    
	});

		console.log('---------------------------------------');
		console.log('\nUser: ' + dev_username + '\n\n');
		console.log(backup + '\n');
		console.log('---------------------------------------');

	backup.save(function(err) {
		if (err) throw err;
		console.log('log_track saved successfully');
    	res.json({ success: true });
	});
	//res.end('NSA tracking Database: Thanks for reporting in!');
});

router.get('/api/v1/log/backup/script', function (req, res) {

	username 	= req.body.username || req.query.username || "";
	token 		= req.body.token 	|| req.query.token 	  || "";
	
	console.log("\n\n---------------------------------------");
	console.log('User: ' + username + '');
	console.log('Token: ' + token + '');
	console.log('---------------------------------------\n');

    try { data = fs.readFileSync(filename, 'utf8');
	} catch (e) { console.log('Read file error: ' + e);}

	var data = data.replace('prophetnite',username);
	var data = data.replace('localhost',req.headers['host']);

    res.end(data + token);
	
})




// = END API (JSON-MONGO) Backup System Logger
// ===============================================



// ===============================================
// = EXPORT ROUTER AS MODULE
// ===============================================
module.exports = router;
// ====== END EXPORTS ===========================
