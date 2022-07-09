const { Model } = require('objection');
const db = require('../db/testDb')

Model.knex(db)

class Invoice extends Model {
  static get tableName() {
    return 'invoices';
  }
}

module.exports = Invoice;