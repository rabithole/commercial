/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('order_line_items').insert([
    {id: 1, order_id: 1, product_id: 1, quantity: 2, unit_price: 40.00 },
    {id: 2, order_id: 2, product_id: 2, quantity: 1, unit_price: 67.05 },
    {id: 3, order_id: 3, product_id: 3, quantity: 5, unit_price: 23.34 }
  ]);
};
