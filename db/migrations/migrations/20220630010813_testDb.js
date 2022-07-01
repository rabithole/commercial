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
        table.string('primary_contact_id').notNullable().unsigned().references('employee.employee_id').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('cost_plus').notNullable().unsigned();
        table.string('street').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();

        // cannot specify integer length in postgres?
        table.integer('zip', 5);  
        table.float('annual_revenue');
    })
    .createTable('employee', table => {
        table.increments('employee_id')notNullable().unsigned().references('companies.primary_contact_id').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email')notNullable().unique();
        table.string('phone').checkRegex('[0-9]{10}');
        table.string('password').notNullable();
        table.string('username');
        table.string('title');
    })
    .createTable('invoice', table => {
        table.integer('company_id').notNullable().unsigned().references('companies.company_id').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('invoice_number').notNullable().unsigned();
        table.float('balance').notNullable();
        table.float('amount_paid').notNullable().unsigned();
        table.datetime('date_time', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable().unsigned();
        table.boolean('fullfillment').defaultTo('no', { fullfillment: 'fullfillment_value' }).notNullable();
        table.string('notes', [1000]).nullable();
        table.integer('order_id').notNullable().unsigned();
    })
    .createTable('order', table => {
        table.integer('order_id').notNullable().unique().unsigned();
        table.float('total').notNullable().unsigned();
        table.float('balance').notNullable();
        table.float('amount_paid').notNullable().unsigned();
        table.datetime('date_time', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable().unsigned();
        table.boolean('fullfillment').defaultTo('no', { fullfillment: 'fullfillment_value'}).notNullable();

        // Be sure to use stringify when building route 
        table.json('products').notNullable();
        table.string('notes', [1000]).nullable();
        table.integer('company_id').notNullable().unsigned().references('companies.company_id').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('companies');
    .dropTableIfExists('employee');
    .dropTableIfExists('invoice');
    .dropTableIfExists('order');
};
