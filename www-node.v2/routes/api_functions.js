// --------------------- INCLUDES AND CONFIGURATION  ---------------------

// Includes
var express 	=	require('express');
var session 	= 	require('express-session')
var moment 		=	require('moment');
var fs 			=	require("fs");
var jwt    		=	require('jsonwebtoken'); 		// used to create, sign, and verify tokens
var router 		=	express.Router();

// DB Models
var User   		=	require('../models/user');
var Log_IP 		=	require('../models/log_ip');
var Log_backup 		=	require('../models/log_backup');

//Configs
var config 		= 	require('../config'); 				// get our config file
var debug_login	= 	false;								//DEBUG QRZ
var debug_token = 	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiYWRtaW4iOnRydWUsIl9fdiI6MH0.uAE2igqxQbPT6CFFRskRCn-K-jOZYOTP5UtvBDG37Rc";

router.use(session({
  secret: config.secret_token_session,
  resave: false,
  saveUninitialized: false
}))
// --------------------- END INCLUDES AND CONFIGURATION  ---------------------



module.exports = router;