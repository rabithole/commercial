const { Model } = require('objection');
const db = require('../../db/testDb.js')

Model.knex(db)

class Credentials extends Model {
  static get tableName() {
    return 'credentials';
  };
}

module.exports = Credentials;