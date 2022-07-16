const { Model } = require('objection');
const db = require('../../db/testDb.js')

Model.knex(db)

class Memberships extends Model {
  static get tableName() {
    return 'memberships';
  };

  static get virtualAttributes() {
    return ['address'];
  }

  address() {
    return this.street + ' ' + this.city + ' ' + this.state + ' ' + this.zip;
    // console.log('Address function')
  }
}

module.exports = Memberships;