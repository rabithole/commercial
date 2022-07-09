/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('orders').insert([
    {id: 1, company_id: 4, user_id: 1, status: '', notes: ''},
    {id: 2, company_id: 4, user_id: 2, status: '', notes: ''},
    {id: 3, company_id: 4, user_id: 3, status: '', notes: ''}
  ]);
};
