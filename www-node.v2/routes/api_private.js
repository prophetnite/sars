moment 		=	require('moment'),
// --------------------- API (JSON-MONGO) TEST SYSTEM  ---------------------
router.get('/api/log_ip/post', function (req, res) {
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

router.get('/api/log_ip/get/', function (req, res) {

	Log_IP.find({}, function (err, users) {
		res.json(users);
	});
})

router.get('/api/log_ip/get/:username', function (req, res) {
	var username = req.params.username
	Log_IP.find({owner: username}, function (err, users) {
		res.json(users);
	});
})
																																				// SYSTEM CODE: QRZ
																																				//
router.get('/api/log_ip/put/:id', function (req, res) {									// CODE AS SAMPLE ONLY
	var id = req.params.id 																								// NO NEED TO UPDATE OR DELETE IP_LOG
	Log_IP.update({}, function (err, users) {															//
		res.json(users);																										//
	});   																																//
})																																			//

router.get('/api/log_ip/delete/:id', function (req, res) {							//
	var id = req.params.id 																								//
	Log_IP.findByIdAndRemove(id, function (err, users) {									//
		res.json(users);																										//
	});   																																//
})																																			//

// --------------------- END API (JSON-MONGO) TEST SYSTEM  ---------------------



// --------------------- API (JSON-MONGO) TEST SYSTEM  ---------------------
router.get('/api/backup/script/get', function (req, res) {
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
				curl --insecure --data "token=$authtoken&username=$devID" -X GET https://$nesHost/api/mongo/backup/checkin/script\n\n \
				exit;\n\n \
				### user token ###\n' + req.query.token);
})

// --------------------- END API (JSON-MONGO) TEST SYSTEM  ------------------





// --------------------- API (JSON-MONGO) TEST SYSTEM  ---------------------
router.get('/api/backup/checkin', function (req, res) {
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
		console.log('Log_IP saved successfully');
    	res.json({ success: true });
	});
	//res.end('NSA tracking Database: Thanks for reporting in!');
})

// --------------------- END API (JSON-MONGO) TEST SYSTEM  ------------------





module.exports = router;
