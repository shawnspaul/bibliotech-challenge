const fs = require('fs');
const path = require('path');
const env = require('dotenv');
const Sequelize = require('sequelize');
const config = require('../config/config.json');
const defaultConfig = config.development;
const environment = process.env.ENVIRONMENT || 'development';
const environmentConfig = config[environment];

let db = {};

const connection = new Sequelize(environmentConfig.database, environmentConfig.username,environmentConfig.password, {
	host: environmentConfig.host,
	dialect: environmentConfig.dialect,
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