const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const jsend = require('jsend');

//express session and auth
app.use(session({
	secret: 'secret',
	saveUnitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// for validation and responses
app.use(jsend.middleware);
app.use(express.json());
app.use(expressValidator());

// endpoint files for the api
const index = require('./routes/index');
const users = require('./routes/users');
const books = require('./routes/books');

// mount the routers
app.use('/', index);
app.use('/users', users);
app.use('/books', books);

// include db
const db = require('./models');

// sync the database and then run the app
db.connection.sync().then(function() {
	app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));
});
