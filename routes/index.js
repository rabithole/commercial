const express = require('express');
const axios = require('axios');
const fs = require('fs');
let parsingCosts = require('./unitCost.json');
let shapedArray = require('./shapedArray.json');
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
app.use('/unit_costs_controller', setUnitCosts);

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
                // console.log('unit costs', unitCosts)
            }else{
                console.log('There is not another page ---', hasNextPage)
                console.log('Unit Costs array', unitCosts)
                fs.writeFile("unitCost.json", JSON.stringify(unitCosts), function(err){
                    console.log('json file creation')
                })
                return 
            }
        })
}

// getUnitCosts();
// console.log('shapedArray', shapedArray)

let testArray = [{
    "shopify_id": "gid://shopify/ProductVariant/31527349846052",
    "sku": "100001",
    "unit_cost": "13.54"
},
{
    "shopify_id": "gid://shopify/ProductVariant/31527349878820",
    "sku": "100002",
    "unit_cost": "47.44"
},
{
    "shopify_id": "gid://shopify/ProductVariant/31527349911588",
    "sku": "100010",
    "unit_cost": "20.51"
},{
    "shopify_id": "gid://shopify/ProductVariant/40433250369572",
    "sku": "720476",
    "unit_cost": "1865.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40449513619492",
    "sku": "720477",
    "unit_cost": "56.86"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40449515257892",
    "sku": "720478",
    "unit_cost": "19.36"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40449516797988",
    "sku": "720479",
    "unit_cost": "122.42"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40449517781028",
    "sku": "720480",
    "unit_cost": "183.59"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40452842979364",
    "sku": "720481",
    "unit_cost": "210.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40452848320548",
    "sku": "720482",
    "unit_cost": "720.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40456748269604",
    "sku": "720484",
    "unit_cost": "29.5"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40459866636324",
    "sku": "720485",
    "unit_cost": "85.34"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40459871846436",
    "sku": "6001262",
    "unit_cost": "46.95"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461827080228",
    "sku": "720486",
    "unit_cost": "28.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461831438372",
    "sku": "720487",
    "unit_cost": "45.5"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461834387492",
    "sku": "720488",
    "unit_cost": "84.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461836091428",
    "sku": "720489",
    "unit_cost": "330.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461836943396",
    "sku": "720490",
    "unit_cost": "780.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40461837631524",
    "sku": "720491",
    "unit_cost": "1552.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40481752055844",
    "sku": "720492",
    "unit_cost": "25.37"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482664742948",
    "sku": "720493",
    "unit_cost": "37.23"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482667200548",
    "sku": "720494",
    "unit_cost": "56.87"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482667331620",
    "sku": "720495",
    "unit_cost": "97.31"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482667888676",
    "sku": "720496",
    "unit_cost": "299.99"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40482668150820",
    "sku": "720497",
    "unit_cost": "1150.0"
},
{
    "shopify_id": "gid://shopify/ProductVariant/40484142415908",
    "sku": "720498",
    "unit_cost": "258.77"
}]

let parsingArray = [];
function processUnitCostsArray() {
    parsingCosts.map((parsed) => {
        let nulling = parsed.node.unitCost;
        // console.log('nulling', nulling)
       
        if(nulling == null){
            console.log('null');
        }else{
            parsingArray.push({
                shopify_id: parsed.node.variant.id,
                sku: parsed.node.variant.sku,
                unit_cost: parsed.node.unitCost.amount
            })
        }
    })
    console.log('array length', parsingCosts.length)
    console.log('parsed array', parsingArray)

    // fs.writeFile("unitCost.json", JSON.stringify(parsingArray), function(err){
    //     console.log('json file creation')
    // })
}
// processUnitCostsArray()

function postUnitCostsToCommercialApi(array){
    console.log('post unit controller')
    axios
        .post('http://localhost:5080/unit_costs_controller', array)
        .then((response) => {
            console.log('response', response.data)
        })
        .catch(err => {
            console.log('error', err)
        })
}
// postUnitCostsToCommercialApi()


let array = 0; // Length of shaped data.
let i = 0;
let iPlusTen = 20;
function slowProcessCostsJsonFile(){
    while(i < testArray.length){ 
        while(i < iPlusTen){
            if(testArray[i] == undefined){
                console.log('Test array length', testArray.length)
                return
            }else{
                console.log('shaped array', testArray[i])
                console.log('I ---------------', i, 'I Plus Ten:', iPlusTen)
                postUnitCostsToCommercialApi(testArray[i])
                i++
                // this will post or put to the database
            }
        }
        // i = i + 1;
        array = array + 1;
        iPlusTen = i + 20;
        console.log('New Line ----------------------------------------------------------------------------------------------------')
        console.log('I:', i, 'array:', array, 'I Plus Ten:', iPlusTen)  
        console.log('shaped array lenth', testArray.length);  
    }
}
slowProcessCostsJsonFile()

module.exports = app;

