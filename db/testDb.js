const knex = require('knex');
const knexfile = require('./knexfile');

/*
	TODO in production use dependency injection
	to create knex instance so database access 
	can be mocked for tests

	TODO in production don't acess knexfile.development directly
	but decide with env vars which config to use
*/


const db = knex(knexfile.development);
module.exports = db;