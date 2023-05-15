/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('companies', table => {
        table.increments(); 
        table.string('company_name').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone').notNullable();
        table.string('email');
        table.integer('cost_plus').notNullable().unsigned().defaultsTo(15); // unsigend means no negative numbers
        table.string('street');
        table.string('suite');
        table.string('city');
        table.string('state');// Province in Shopify

        // cannot specify integer length in postgres?
        table.integer('zip', 5);  
        table.float('annual_revenue').unsigned(); // Foreign key? 
        table.integer('user_id').references('id').inTable('employees').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('note', 1000);
        table.string('shopify_id').references('shopify_id').inTable('credentials').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('companies');
};
