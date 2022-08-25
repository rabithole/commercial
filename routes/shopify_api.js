const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://discount-indoor-gardening.myshopify.com';
const API_PATH = '/admin/api/2022-07/graphql.json';
const headers = {
	'Content-Type': 'application/json',
	'X-Shopify-Access-Token': "API KEY"
}
const productQuery = `{
	products(first: 10) {
      edges {
        node {
				id
				title
			}
		}
	}
}`;

router.use(express.json());

router.get('/', async (request, response) => {
	response.status(200).json({ ShopifyApi: 'Shopify router fetching?'})

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

	const res = await ShopfyClient.post(API_PATH, { query: productQuery });
	console.log(res.data); // data
	console.log(res.data.data.products.edges); // data
	console.log(res.errors); // errors if any
})

function ShopifyApi() {
	console.log('Shop Api')
}

module.exports = router;