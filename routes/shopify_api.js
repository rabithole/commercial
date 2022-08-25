const express = require('express');
const axios = require('axios');

const router = express.Router();

router.use(express.json());

const ShopifyClient = axios.create({
	baseURL: 'https://discount-indoor-gardening.myshopify.com/admin/api/2022-07/graphql.json', 
	timeout: 5000,
	headers: {
		
	}
})

router.get('/', (request, response) => {
	response.status(200).json({ ShopifyApi: 'Shopify router fetching?'})

	axios
		.get('https://discount-indoor-gardening.myshopify.com/admin/api/2022-07/graphql.json')
		.then(function(response) {
			console.log('api response', response)
		})
	})

function ShopifyApi() {
	console.log('Shop Api')
}

module.exports = router;