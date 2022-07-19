/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) { 
    return knex.schema.createTable('employees', table => {
        table.increments();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique(); // email is username
        table.string('phone').notNullable().checkRegex('[0-9]{10}');
        table.string('password').notNullable();
        table.string('title');
        // add timestamps table? table.timestamps(true, true). referencing the "true, true" in the timestamps function (created at, updated at)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('employees');
};
