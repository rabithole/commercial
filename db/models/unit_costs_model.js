const { Model } = require('objection');
const db = require('../../db/testDb.js')

Model.knex(db)

class UnitCosts extends Model {
  static get tableName() {
    return 'unit_costs';
  };
}

module.exports = UnitCosts;