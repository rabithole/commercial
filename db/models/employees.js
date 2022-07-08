const { Model } = require('objection');
const db = require('../db/testDb')

Model.knex(db)

class Employee extends Model {
  static get tableName() {
    return 'employees';
  }
}

module.exports = Employee;