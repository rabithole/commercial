/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('unit_costs', table => {
        table.increments();
        table.string('unit_cost');
        table.string('sku');
        table.string('shopify_id');
        table.string('created_at');
        table.string('updated_at');
        table.timestamp('last_run').defaultTo(knex.fn.now());
        // table.timestamps(true, true);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('unit_costs');
};