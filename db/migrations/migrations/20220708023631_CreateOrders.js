/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('orders', table => {
    table.increments();
    table.integer('company_id');
    table.integer('user_id');
    table.string('status');
    table.text('notes');

    /*
        How to include products?
        Order will be a list of requested products. 
        Items in order must be moved to a new state;
            -- On order from supplier
            -- shipped from our warehouse
            -- fullfilled
            -- cannot locate
            -- price check with customer
            -- backordered
            -- different product suggested      
    */
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders');
};
