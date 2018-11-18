const passport = require('passport');
const jsend = require('jsend');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const saltRounds = 10;

const db = require('./../models');

let user_id = null;
let hash = null;

exports.signIn = [
	// make sure email exists or else kick back an error message to the user
	check('email')
		.trim()
		.not().isEmpty()
		.isEmail()
		.normalizeEmail()
		.custom(value => {
			return db.User.findOne({where:{email: value}}).then(user => {
				if (!user) {
					return Promise.reject(`User does not exist`);
				} else {
					hash = user.dataValues.password;
					user_id = user.dataValues.id;
				}
			})
		}),
	// make sure user submitted something for password
	check('password')
		.not().isEmpty(),

	async function(req,res) {
		// if there were any validation errors from above, return those errors to the user
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.jsend.fail({errors:errors.array()});
		}

		// if there were not validation errors, check the user's password input against the hash stored in the users table
		let valid = await bcrypt.compare(req.body.password, hash);

		// if the hash is valid, log the user in via password or else throw an invalid login message
		if (valid) {
			req.login(user_id, function(err) {
				return res.jsend.success({message: "You have successfully logged in."});
			});
		} else {
			return res.jsend.fail({message: "Invalid login"});
		}
	}
];



let institution_id = null;

exports.createUser = [
	//validate the body information 
	check('name')
		.trim()
		.not().isEmpty()
		.withMessage("Your full name is required"),
	check('email')
		.trim()
		.not().isEmpty()
		.isEmail()
		.normalizeEmail()
		.withMessage("Please enter a valid institution email")
		.custom(value => {
			//make sure the email doesn't already exist in the users table
			return db.User.findOne({where:{email: value}}).then(email => {
				if (email) {
					return Promise.reject(`User with the email address ${value} already exists`);
				}
			})
		})
		.custom(value => {
			// make sure the domain from the user's email exists in the institutions table
			let domain = value.split('@')[1];
			return db.Institution.findOne({where:{email_domain: domain}}).then(institution => {
				if (!institution) {
					return Promise.reject(`Institution with the domain ${domain} does not exist.`);
				} else {
					institution_id = institution.id;
				}
			})
		}),
	//make sure that the user is submitting a role that exists
	check('role')
		.trim()
		.not().isEmpty()
		.isIn(['student','academic','administrator'])
		.withMessage("Role must be one of the following: 'student','academic', or 'administrator'"),
	check('password')
		.trim()
		.not().isEmpty(), 

	async function(req,res) {
		// if there were any validation errors from above, return those errors to the user
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.jsend.fail({errors:errors.array()});
		}
		// if validation passed, encrypt the password and store the user's information in the users table
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			db.User.create({
				name: req.body.name,
				email: req.body.email,
				role: req.body.role,
				password: hash,
				institution: institution_id
			}).then(result => {
				if (result.dataValues.id !== undefined) {
					return res.jsend.success({message: `${result.dataValues.name} is now registered as a ${result.dataValues.role}`});
				} else {
					return res.jsend.fail({info: result});
				}
			}).catch(err => {
				return res.jsend.error({error: err});
			});
		})
	}
];

passport.serializeUser(function(user_id, done) {
  	done(null, user_id);
});
 
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});