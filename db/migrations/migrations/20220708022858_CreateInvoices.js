/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('invoices', table => {
    table.increments();
    table.integer('company_id');
    table.integer('order_id');
    table.float('balance');
    table.float('paid');
    table.datetime('date_time');
    table.boolean('fulfillment');
    table.float('total');
    table.text('notes');

    // How to include products on invoice 
    // company_id is a foreign key
    // invoice_number = id?
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('invoices');
};
