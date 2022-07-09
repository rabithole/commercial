/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('invoices').insert([
    { id: 1, company_id: 45, order_id: 4, balance: 600.50, paid: 'no', date_time: , fullfillment: 'yes', total: 50345.69, notes: 'There is a long winded speaker typing this out.' },
    {id: 2, company_id: 56, order_id: 5, balance: 790.45, paid: 'yes', date_time: , fullfillment: 'yes', total: 100000.34, notes: 'What are notes?' },
    {id: 3, company_id: 36, order_id: 6, balance: 56.34, paid: 'no', date_time: , fullfillment: 'yes', total: 65000.34, notes: 'Blah blah blah' }
  ]);
};
