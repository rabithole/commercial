/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_line_items', table => {
    table.increments();
    table.text('title');
    table.integer('sku');
    table.integer('quantity');
    table.float('origianlUnitPrice');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('order_line_items');
};
