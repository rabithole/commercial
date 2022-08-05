const { Model } = require('objection');
const db = require('../../db/testDb.js')
const Employee = require('./employees_model');
const Memberships = require('./memberships_model');

Model.knex(db)

class Company extends Model {
  static get tableName() {
    return 'companies';
  };

  static get relationMappings() {
    return {
      employees: {
        relation: Model.ManyToManyRelation,
        modelClass: Employee,
        join: {
          from: 'companies.id',
            through: {
              from: 'memberships.company_id',
              to: 'memberships.user_id'
            },
          to: 'employees.id'
        } 
      }
    }
  }
}

module.exports = Company;