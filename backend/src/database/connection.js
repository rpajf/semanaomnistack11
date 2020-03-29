const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;
//test or develop enviroment

const connection = knex(config)
//take a different connection in other enviroment,
//all in knexfile


module.exports = connection;
