/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) { 
    return knex.schema.createTable('employees', table => {
        table.increments();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').unique();
        table.string('phone').checkRegex('[0-9]{10}');
        table.string('password').notNullable();
        table.string('username');
        table.string('title');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('employees');
  
};
