const { Model } = require('objection');
const db = require('../db/testDb')

Model.knex(db)

class Order extends Model {
  static get tableName() {
    return 'orders';
  }
}

module.exports = Order;