const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://discount-indoor-gardening.myshopify.com';
const API_PATH = '/admin/api/2022-07/graphql.json';
const headers = {
	'Content-Type': 'application/json',
	'X-Shopify-Access-Token': process.env.ADMIN_API_KEY
}
const productQuery = `{
    inventoryItems(first: 5) {
        edges{
            node{
                id,
                tracked,
                sku,
                variant{
                    title,
                    displayName,
                    price
                }
                unitCost{
                    amount
                    currencyCode
                }
            }
        }
    }
}`;

const createCompanyQuery = `{
    
}`

router.use(express.json());

router.get('/', async (request, response) => {
	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

	const res = await ShopfyClient.post(API_PATH, { query: productQuery });
	response.status(200).json(res.data);
	// console.log('Response data', res.data); // data
	// console.log('proudcts edges', res.data.data.products.edges); // data
	// console.log('Response errors', res.errors); // errors if any
})

module.exports = router;