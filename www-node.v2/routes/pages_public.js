// ==== FILE: api_public.js ====

// ===========================================================
//  					CORE SITE PAGES - PRIVATE
// ===========================================================
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

router.get('/register', function (req, res){
	if (req.session.token){res.redirect('/dashboard')}
	res.render('pages/register');
});
// ================  END CORE SITE PAGES - PUBLIC  ===================

module.exports = router;
