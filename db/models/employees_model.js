const { Model } = require('objection');
const db = require('../../db/testDb.js');
const Company = require('./companies_model');

Model.knex(db)

class Employee extends Model {
  static get tableName() {
    return 'employees';
  };
}

module.exports = Employee;