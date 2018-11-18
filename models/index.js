const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

let db = {};

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_TYPE,
});

db.Books = connection['import'](path.join(__dirname,'Books.js'));
db.Institution = connection['import'](path.join(__dirname,'Institution.js'));
db.User = connection['import'](path.join(__dirname,'User.js'));

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.connection = connection;
db.sequelize = Sequelize;

module.exports = db;