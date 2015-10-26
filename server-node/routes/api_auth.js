// ==== FILE: api_auth.js ====

// ===============================================
// = Misc Library includes
// ===============================================
var jwt         =   require('jsonwebtoken');        // used to create, sign, and verify tokens

// ===============================================
// =          API (MONGO) AUTHENTICATION ROUTES
// = Everything after token verify requires authentication
// ===============================================
router.post('/api/authenticate', function (req, res) {
  // find the user
  	User.findOne({
  		$or: [
            	{ 'name' : req.body.name },
            	{ 'email' : req.body.name}
          	]


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
          expiresInMinutes: 120 // expires in 24 hours
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

// ===============================================
// = ROUTE MIDDLEWARE TO VERIFY TOKEN
// ===============================================
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


// ===============================================
// = EXPORT ANY ROUTER OBJECTS
// ===============================================
module.exports = router;
// ===============================================
