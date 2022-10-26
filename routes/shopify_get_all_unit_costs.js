const express = require('express');
const axios = require('axios');

const app = express.Router();

const BASE_URL = 'https://discount-indoor-gardening.myshopify.com';
const API_PATH = '/admin/api/2022-07/graphql.json';
const headers = {
	'Content-Type': 'application/json',
	'X-Shopify-Access-Token': process.env.ADMIN_API_KEY
}

app.use(express.json());

app.post('/', async (request, response) => {
    let cursor = request.body.after;
    console.log('cursor from query body ---', cursor)
    console.log('space -------------')

    let getAllUnitCosts =`{
           inventoryItems(first: 250, after: ${cursor}){
            edges{
                node{
                    variant{
                        id 
                        sku
                        updatedAt
                    }
                    unitCost{
                        amount
                    }
                }
            }
            pageInfo{
                hasNextPage
                hasPreviousPage
                endCursor
            }
           }
        }`

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: getAllUnitCosts });
    response.status(200).json(res.data);

    // let pageCursor = res.data.data.inventoryItems.pageInfo;
    // console.log('Page Cursor ---', pageCursor)
  });

module.exports = app;