const express = require('express');
const axios = require('axios');
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
const companyUpdate = require('./shopify_update_company');
const productCategories = require('./shopify_get_product_collections');
const productCollection = require('./shopify_get_product_collection');
const product = require('./shopify_get_product');
const getAllUnitCosts = require('./shopify_get_all_unit_costs'); 

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
app.use('/shopify_update_company', companyUpdate)
app.use('/shopify_get_product_collections', productCategories)
app.use('/shopify_get_product_collection', productCollection)
app.use('/shopify_get_product', product);
app.use('/shopify_get_all_unit_costs', getAllUnitCosts);

let hasNextPage = false;
let cursor = null;
function getUnitCosts(){
    console.log('has nex page before request', hasNextPage)
    console.log('cursor before request', cursor)

    axios
        .post('http://localhost:5080/shopify_get_all_unit_costs', {firstProducts: 250, after: cursor})
        .then((response) => {
            hasNextPage = response.data.data.inventoryItems.pageInfo.hasNextPage;     
            cursor = response.data.data.inventoryItems.pageInfo.endCursor;
            console.log('response data', response.data.data)
            if(hasNextPage == true){
                console.log('Yes there is another page', hasNextPage)
                getUnitCosts();
            }else{
                console.log('There is not another page')
            }
        })
        .then((respoonse) => {
            console.log('.then 2')
        })
}

getUnitCosts();

console.log('end of index.js')

module.exports = app;

