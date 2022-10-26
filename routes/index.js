const express = require('express');
const axios = require('axios');
const fs = require('fs');
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
const setUnitCosts = require('./unit_costs_controller');

const { response } = require('express');

const app = express();

app.use(express.json());

app.use('/companies', companyController);
app.use('/employees', employeesController);
app.use('/invoices', invoicesController);
app.use('/memberships', membershipsController);
app.use('/order_Line_Items', orderLineItemsController);
app.use('/orders', ordersController);
app.use('/post_unit_costs', setUnitCosts);

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
let unitCosts = [];
// console.log('unit costs array', unitCosts)

function getUnitCosts() {
    axios
        .post('http://localhost:5080/shopify_get_all_unit_costs', {firstProducts: 250, after: cursor})
        .then((response) => {
            hasNextPage = response.data.data.inventoryItems.pageInfo.hasNextPage;     
            cursor = JSON.stringify(response.data.data.inventoryItems.pageInfo.endCursor);
            // console.log('response inventory items', response.data.data.inventoryItems.edges)
            let unitCostsData = response.data.data.inventoryItems.edges;
            unitCosts.push(...unitCostsData)
            if(hasNextPage == true){
                console.log('Yes there is another page ---------------------------------------------------------------------------', hasNextPage)
                setTimeout(getUnitCosts, 10000);
            }else{
                console.log('There is not another page ---', hasNextPage)
                console.log('Unit Costs array', unitCosts)
                fs.writeFile("unitCost.json", JSON.stringify(unitCosts));
                return 
            }
        })
}

getUnitCosts();

function processUnitCostsArray() {

}

function postUnitCostsToCommercialApi(){
    axios
        .post('http://localhost:5080/post_unit_costs', testCosts)
        .then((response) => {
            console.log('response', response)
        })
        .catch(err => {
            console.log('error', err)
        })
}

module.exports = app;

