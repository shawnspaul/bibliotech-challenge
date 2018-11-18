let should = require('should');
let supertest = require('supertest');  
let request = require('request');
let chai = require('chai');
let expect = require('chai').expect;
let baseUrl = "http://localhost:3000";
let util = require('util');
let postRequest = require('supertest');

let users = [
	{
		email:"pstar@indiana.edu",
		password:"password",
		name: "Patrick Start",
		role: "administrator",
		status: "success",
	},
	{
		email:"rbyrd@anderson.edu",
		password:"password",
		name: "Rocky Byrd",
		role: "student",
		status: "success",
	},
	{
		email:"mscott@uindy.edu",
		password:"password",
		name: "Michael Scott",
		role: "academic",
		status: "success",
	},
	{
		email:"rswanson@purdue.edu",
		password:"password",
		name: "Ron Swanson",
		role: "student",
		status: "success",
	},	
	{
		email:"rswanson@att.com",
		password:"password",
		name: "Ron Swanson",
		role: "ddd",
		status: "fail",
	},	
	{
		email:"rswanson@yahoo.com",
		password:"password",
		name: "Ron Swanson",
		role: "dfasd",
		status: "fail",
	},	
];
// home route
describe("/GET /", function() {
	it('Tells you to login', function(done) {
		request.get({url: baseUrl},
			function(error, reponse, body) {
				let bodyObj = JSON.parse(body);
				console.log(bodyObj.data.message);
				expect(reponse.statusCode).to.equal(200);
				expect(bodyObj.status).to.equal("success");
				expect(bodyObj.data.message).to.equal("Go sign in at /users/signin");
				done();
			});
	});
});

for (let user of users) {
	// successfully create user
	describe("/POST users/create", function() {
		it('Creates a new user', function(done) {
			postRequest(baseUrl)
				.post('/users/create')
				.send(user)
				.set('accept','application/json')
				.expect('Content-Type', /json/)
				.end(function(error,response) {
					expect(response.body.status).to.equal(user.status);
					// expect(response.body.data.message).to.equal(`${user.name} is now registered as a ${user.role}`);
					done();
				});
		});
	});
}

for (let user of users) {
	// successfull login
	describe("/POST signin", function() {
		it('Returns successfull login', function(done) {
			postRequest(baseUrl)
				.post('/users/signin')
				.send(user)
				.set('accept','application/json')
				.expect('Content-Type', /json/)
				.end(function(error,response) {
					expect(response.body.status).to.equal(user.status);
					// expect(response.body.data.message).to.equal("You have successfully logged in.")
					done();
				});
		});
	});
}

// test books route
describe("/GET /books", function() {
	it('Tells you to sign in to view books', function(done) {
		request.get({url: baseUrl + '/books'},
			function(error, reponse, body) {
				let bodyObj = JSON.parse(body);
				console.log(bodyObj.data.message);
				expect(reponse.statusCode).to.equal(200);
				expect(bodyObj.status).to.equal("success");
				expect(bodyObj.data.message).to.equal("You must login to access this page");
				done();
			});
	});
});


for (let user of users) {
	// test books route after signing in
	describe("/POST signin, then /GET books", function() {
		it('Returns successfull login, then returns books list', function(done) {
			postRequest(baseUrl)
				.post('/users/signin')
				.send(user)
				.set('accept','application/json')
				.expect('Content-Type', /json/)
				.end(function(error,response) {
					expect(response.body.status).to.equal(user.status);
					// expect(response.body.data.message).to.equal("You have successfully logged in.")
					let Cookies = response.headers['set-cookie'].pop().split(';')[0];
					if (response.body.status == 'success') {
						let j = request.jar();
						j.setCookie(Cookies,baseUrl + '/books');
						request({url: baseUrl + '/books', jar: j}, function(error, response, body) {
							let bodyObj = JSON.parse(body);
							expect(bodyObj.status).to.equal(user.status);
							expect(bodyObj.data.books).to.not.be.null;
							done();
						})
					} else {
						done();
					}
				});
		});
	});
}