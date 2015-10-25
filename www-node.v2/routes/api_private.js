// ==== FILE: api_private.js ====

// ===============================================
// = API (JSON-MONGO) TEST SYSTEM
// ===============================================
moment 		=	require('moment')
// === END API TEST ==============================




// ===============================================
// = API (JSON-MONGO) TEST SYSTEM
// ===============================================
router.get('/api/v1/log_track/post', function (req, res) {
	var trackip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		// Load tracking data to be logged
	var ts_hms = moment().format('hh:mm:ss');
	var ts_ymd = moment().format('L');
	var fullheader = req.headers;

	if (req.session.username) {
		owner = req.session.username
	} else {
		owner = req.body.username
	}

	var log_track = new Log_track({
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

	log_track.save(function(err) {
		if (err) throw err;
		console.log('log_track saved successfully');
    	res.json({ success: true });
	});
	//res.end('NSA tracking Database: Thanks for reporting in!');
})

router.get('/api/v1/log_track/get/', function (req, res) {

	log_track.find({}, function (err, users) {
		res.json(users);
	});
})

router.get('/api/v1/log_track/get/:username', function (req, res) {
	var username = req.params.username
	log_track.find({owner: username}, function (err, users) {
		res.json(users);
	});
})
																																				// SYSTEM CODE: QRZ
																																				//
router.get('/api/v1/log_track/put/:id', function (req, res) {									// CODE AS SAMPLE ONLY
	var id = req.params.id 																								// NO NEED TO UPDATE OR DELETE IP_LOG
	log_track.update({}, function (err, users) {															//
		res.json(users);																										//
	});   																																//
})																																			//

router.get('/api/v1/log_track/delete/:id', function (req, res) {							//
	var id = req.params.id 																								//
	log_track.findByIdAndRemove(id, function (err, users) {									//
		res.json(users);																										//
	});   																																//
})																																			//
// ====== END API (JSON-MONGO) TEST SYSTEM ===============================




// ===============================================
// = API (JSON-MONGO) TEST SYSTEM
// ===============================================
router.get('/api/v1/backup/script/get', function (req, res) {
	if (req.session.username) {
		owner = req.session.username
	} else {
		owner = req.body.username
	}

		console.log('---------------------------------------');
		console.log('\nUser: ' + owner + '\n\n');
		console.log('\nToken: ' + req.query.token + '\n\n');
		console.log('---------------------------------------');



	res.end(' #!/bin/bash \n \
				#checkin_auth.sh\n\n \
				devID=\'38554\' \n \
				nesHost=\'localhost\' \n \
				authtoken="$(tail -n 1 agent_checkin.sh)" \n \
				curl --insecure --data "token=$authtoken&username=$devID" -X GET https://$nesHost/api/v1/mongo/backup/checkin/script\n\n \
				exit;\n\n \
				### user token ###\n' + req.query.token);
})
// ====== END API (JSON-MONGO) TEST SYSTEM ===============================




// ===============================================
// = API (JSON-MONGO) TEST SYSTEM
// ===============================================
router.get('/api/v1/backup/checkin', function (req, res) {
	var trackip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		// Load tracking data to be logged
	var ts_hms = moment().format('hh:mm:ss');
	var ts_ymd = moment().format('L');
	var fullheader = req.headers;

	if (req.session.username) {
		owner = req.session.username
	} else {
		owner = req.body.username
	}

	var log_backup = new Log_backup({
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
		console.log(log_backup + '\n')
		console.log('---------------------------------------')

	log_backup.save(function(err) {
		if (err) throw err;
		console.log('log_track saved successfully');
    	res.json({ success: true });
	});
	//res.end('NSA tracking Database: Thanks for reporting in!');
})
// ====== END API (JSON-MONGO) TEST SYSTEM ===============================



// ===============================================
// = EXPORT ROUTER AS MODULE
// ===============================================
module.exports = router;
// ====== END EXPORTS ===========================
