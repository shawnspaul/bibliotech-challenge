const express = require('express');
const router = express.Router();
const passport = require('passport');
const jsend = require('jsend');

router.get('/', function(req,res) {
	if (req.isAuthenticated()) {
		return res.jsend.success({message:"You are signed in"});
	} else {
		return res.jsend.success({message:"Go sign in at /users/signin"});
	}
});

module.exports = router;
