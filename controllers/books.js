const passport = require('passport');
const jsend = require('jsend');

const db = require('./../models');

exports.getBooks = (req, res) => {
	if (req.isAuthenticated()) {
		db.User.findOne({attributes: ['institution'], where: {id: req.user}}).then(user => {
			db.Books.findAll({attributes: ['isbn','title','author'], where: {institutions: {$contains: [user.dataValues.institution]}}}).then(books => {
				if (!books) {
					return res.jsend.fail({message: "No books available for you"});
				} else {
					return res.jsend.success({books:books});
				}
			})
		});
	} else {
		res.jsend.success({message:"You must login to access this page"});
	}
};
