/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('companies').insert([
    { id: 1000, name: 'Discount Indoor Gardening', cost_plus: 15, street: '9707 Dielman Rock Island Industrial Dr', city: 'Olivette', state: 'MO', zip: 63132, annual_revenue: 12000 },
    { id: 1001, name: 'La La Land', cost_plus: 0, street: '0001 Fantasy Land Dr', city: 'Munchkinville', state: 'Kansas', zip: 10109, annual_revenue: 120000 },
    { id: 2000, name: 'Growers Paradise', cost_plus: 50, street: '5679 Hot Girls Road', city: 'Ya Right', state: 'No Where', zip: 45678, annual_revenue: 12000000 }
  ]);
};
