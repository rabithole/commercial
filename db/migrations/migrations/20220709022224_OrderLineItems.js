/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_line_items', table => {
    table.increments();
    table.integer('title').references('id').inTable('orders').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('sku'); // References shopify id
    table.integer('quantity');
    table.float('originalUnitPrice');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('order_line_items');
};
