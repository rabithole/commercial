/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
  return knex.schema
    .createTable('companies', table => {

        // company id. Replace with generated or referenced id.
        // How to set primary key?
        table.increments('company_id'); 
        table.string('name').notNullable();
        table.string('primary_contact_id').notNullable().unsigned().references('employee_id').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('cost_plus').notNullable().unsigned();
        table.string('street').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();

        // cannot specify integer length in postgres?
        table.integer('zip', 5);  
        table.float('annual_revenue');
    })
    .createTable('employee', table => {
        table.increments('employee_id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email')notNullable().unique();
        table.string('phone').checkRegex('[0-9]{10}');
        table.string('password').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('companies');
};
