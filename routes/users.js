const express = require('express');
const users = express.Router();

const UsersController = require('../controllers/users');

users.post('/signin', UsersController.signIn);
users.post('/create', UsersController.createUser);


module.exports = users;