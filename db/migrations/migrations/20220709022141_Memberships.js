/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('memberships', table => {
    table.increments();
    table.integer('company_id');
    table.integer('user_id');
    table.text('status');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('memberships');
};

// user_id table --- .references('id').inTable('employees').onUpdate('CASCADE').onDelete('CASCADE')
// company_id table --- .references('id').inTable('companies').onUpdate('CASCADE').onDelete('CASCADE')