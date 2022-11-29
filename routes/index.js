const express = require('express');

let parsingCosts = require('./unitCost.json');
let shapedArray = require('./shapedArray.json');
let getUnitCosts = require('./update_unit_costs_process.js');

const companyController = require('./companies_controller');
const employeesController = require('./employees_controller');
const invoicesController = require('./invoices_controller');
const membershipsController = require('./memberships_controller');
const orderLineItemsController = require('./order_line_items_controller');
const ordersController = require('./orders_controller');
const shopifyCreateCompany = require('./shopify_create_company');
const storefrontApi = require('./storefront_api');
const shopifyGetCompany = require('./shopify_get_company');
const companyUpdate = require('./shopify_update_company');
const productCategories = require('./shopify_get_product_collections');
const productCollection = require('./shopify_get_product_collection');
const product = require('./shopify_get_product');
const getAllUnitCosts = require('./shopify_get_all_unit_costs'); 
const setUnitCosts = require('./unit_costs_controller');
const getUnitCostBySku = require('./get_unit_cost_by_sku');
const createDraftOrder = require('./create_draft_order');

const { response } = require('express');
const app = express();
app.use(express.json());

app.use('/companies', companyController);
app.use('/employees', employeesController);
app.use('/invoices', invoicesController);
app.use('/memberships', membershipsController);
app.use('/order_Line_Items', orderLineItemsController);
app.use('/orders', ordersController);
app.use('/unit_costs_controller', setUnitCosts);
app.use('/costs_by_sku', getUnitCostBySku);

// Shopify graphql API endpoints
app.use('/shopify_create_company', shopifyCreateCompany);
app.use('/shopify_get_company', shopifyGetCompany)
app.use('/storefront_api', storefrontApi);
app.use('/shopify_update_company', companyUpdate)
app.use('/shopify_get_product_collections', productCategories)
app.use('/shopify_get_product_collection', productCollection)
app.use('/shopify_get_product', product);
app.use('/shopify_get_all_unit_costs', getAllUnitCosts);
app.use('/create_draft_order', createDraftOrder);

// Process to query unit cost data from Shopify and store it in our database.
// getUnitCosts();

module.exports = app;

