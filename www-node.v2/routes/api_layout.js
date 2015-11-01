// ===========================
// 			API LAYOUT
// ===========================
// THIS FILE IS FOR NOTES ONLY
// ===========================

/routes/pages_public.js
		GET /api
		GET /
		GET /login
		GET /logout
		GET /register

/routes/api_public.js
		POST /api/register

/routes/api_auth.js
				POST /api/authenticate
			 	function()-force authenticate
[AUTH]	GET	 /api/users

/routes/pages_private.js
[AUTH]	GET /dashboard
[AUTH]	GET /log_ip
[AUTH]	GET /devices
[AUTH]	GET /map
[AUTH]	GET /settings
[AUTH]	GET /contacts
[AUTH]	GET /about


/routes/api_private.js
[AUTH]	GET /api/log_ip/post?token=[token]&user=[user]&
[AUTH]	GET /api/log_ip/get/
[AUTH]	GET /api/log_ip/get/:username
[AUTH]	GET /api/log_ip/delete/:_id

[AUTH]	GET /api/backup/script/get
[AUTH]	GET /api/backup/checkin


SYSTEM CODE: QRZ								// SAMPLE CODE ONLY - REMOVE FROM DEPLOYMENT BRANCH
SYSTEM CODE: DEBUG QRZ          // FOR NON-PRODUCTION - REMOVE FROM DEPLOYMENT BRANCH



app.use(require('./routes/pages_public'))
app.use(require('./routes/api_public'))
app.use(require('./routes/api_auth'))
app.use(require('./routes/pages_private'))
app.use(require('./routes/api_private'))
