const { Model } = require('objection');
const db = require('../../db/testDb.js')
const Employee = require('./employees_model');

Model.knex(db)

class Company extends Model {
  static get tableName() {
    return 'companies';
  };

  static get relationMappings() {
    return {
      employees: {
        relation: Model.BelongsToOneRelation,
        modelClass: Employee,
        join: {
          from: 'companies.id',
          to: 'employees.id'
        } 
      }
    }
  }
}

module.exports = Company;