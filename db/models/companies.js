const { Model } = require('objection');
const db = require('../db/testDb')

Model.knex(db)

class Company extends Model {
  static get tableName() {
    return 'companies';
  }
}

module.exports = Company;