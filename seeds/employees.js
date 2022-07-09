/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('employees').insert([
    { id: 1, first_name: 'Bobby', last_name: 'Dude', email: 'buds@gmail.com', phone: 6255826598, password: 'blahblah', username: 'bobbyDude1$', title: 'Jo Shmo' },
    { id: 2, first_name: 'Micheal', last_name: 'Jordan', email: 'goat@dig.supply', phone: 9625865647, password: 'iAmthBest$5', username: 'goatenit', title: 'goat' },
    { id: 3, first_name: 'Brett', last_name: 'Holt', email: 'holtbp@hotmail.com', phone: 5215855689 , password: 'datAdude6^', username: 'goat', title: 'goat' }
  ]);
};
