const { Model } = require('objection');
const db = require('../../db/testDb.js')

Model.knex(db)

class Memberships extends Model {
  static get tableName() {
    return 'memberships';
  };
}

module.exports = Memberships;