/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('companies', table => {
        table.increments(); 
        table.string('name').notNullable();
        table.integer('cost_plus').notNullable().unsigned().defaultsTo(15); // unsigend means no negative numbers
        table.string('street').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();

        // cannot specify integer length in postgres?
        table.integer('zip', 5).notNullable();  
        table.float('annual_revenue').unsigned(); // Foreign key? 
        table.integer('user_id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('companies');
};
