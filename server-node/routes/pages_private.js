// ==== FILE: api_public.js ====

// ===========================================================
//  					CORE SITE PAGES - PRIVATE
// ===========================================================
router.get('/dashboard', function (req, res){
	console.log('\nDashboard: Token: ' + req.session.token)																// #DEBUG QRZ

	//load data from DB here
	res.render('pages/dashboard', {
		pagetitle: 'Welcome to you Dashboard',
			username: req.session.username,
			namefirst: "",
			namelast: "",
			title: "Security Engineer",
			email: 34,
			messages: 343,
			token: req.session.token});
});
router.get('/log_ip', function (req, res){
	//load data from DB here
		pagedata = Log_IP.find({}, function (err, users) {  console.log('HELLO NODEMON????');   });
	res.render('pages/log_ip', {
		pagetitle: "Live IP Log",
		username: req.session.username,
		pagedata: pagedata
	});
});
router.get('/devices', function (req, res){
	//load data from DB here
	res.render('pages/devices', {
		pagetitle: 'Devices',
		username: req.session.username
	});
});
router.get('/map', function (req, res){
	//load data from DB here
	res.render('pages/map', {
		pagetitle: 'Live Tracking MAP',
		username: req.session.username
	});
});
router.get('/settings', function (req, res){
	//load data from DB here
	res.render('pages/settings', {
		pagetitle: 'Settings',
		username: req.session.username
	});
});
router.get('/contacts', function (req, res){
	//load data from DB here
	res.render('pages/contacts', {
		pagetitle: 'Contacts',
		username: req.session.username
	});
});
router.get('/about', function (req, res){
	//load data from DB here
	res.render('pages/about', {
		pagetitle: 'About us',
		username: req.session.username
	});
});
//  ============= END CORE SITE PAGES - PRIVATE ==================



module.exports = router;
