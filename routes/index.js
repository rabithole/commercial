const express = require('express');
// const Company = require('../db/models/companies_model');
const companyController = require('./companies_controller');
const employeesController = require('./employees_controller');
const invoicesController = require('./invoices_controller');
const membershipsController = require('./memberships_controller');
const orderLineItemsController = require('./order_line_items_controller');
const ordersController = require('./orders_controller');
const shopifyCreateCompany = require('./shopify_create_company');
const storefrontApi = require('./storefront_api');
const shopifyGetCompany = require('./shopify_get_company');

const app = express();

app.use(express.json());

app.use('/companies', companyController);
app.use('/employees', employeesController);
app.use('/invoices', invoicesController);
app.use('/memberships', membershipsController);
app.use('/order_Line_Items', orderLineItemsController);
app.use('/orders', ordersController);

// Shopify graphql API endpoints
app.use('/shopify_create_company', shopifyCreateCompany);
app.use('/shopify_get_company', shopifyGetCompany)
app.use('/storefront_api', storefrontApi);

app.get('/', (request, response) => {
    response.status(200).json({ server: 'Is Running'});
});

module.exports = app;

