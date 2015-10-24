
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



module.exports = router;