// ==== FILE: api_public.js ====

// ===========================================================
//  								API LOGIC ROUTES - PUBLIC
// ===========================================================
router.post('/api/register', function (req, res){		
	//if (req.session.token){res.redirect('/dashboard')}
	console.log('endpoint hit');
	console.log(req.body.firstname);
	console.log(req.body.lastname);
	console.log(req.body.email);
	console.log(req.body.email2);
	console.log(req.body.password);

	// Check if username already registered
	User.findOne({
			$or: [
            	{ 'username' : req.body.email },
           		{ 'email': req.body.email }
           	]}, function(err, user) {
    			if (err) throw err;
    			if (!user){
    				console.log('User not registered');
    				var userreg = new User({
    					firstname:req.body.firstname,
    					lastname:req.body.lastname,
    					email:req.body.email,
    					password:req.body.password
    				});
    				userreg.save(function(err) {
    					console.log('user saved');
                        res.json({success:true, message:"user saved"});
    				});

    				res.json({success:false, message:"usersave attempted"});
    			} else {
    				console.log('User already registered');
    				res.json({success:false, message:"username"});
    			}

			});
console.log("FINEUSER: ");

//	res.json({success:true});
});
// ============= END API LOGIC ROUTES - PUBLIC ==============


module.exports = router;
