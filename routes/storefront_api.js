const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://discount-indoor-gardening.myshopify.com';
const API_PATH = '/api/2022-07/graphql.json';
const headers = {
	'Content-Type': 'application/json',
	'X-Shopify-Storefront-Access-Token': "c86dc42b352ccd6e4b22ad49c3de0cc6"
}
const productQuery = `{
   products(first: 5) {
       edges{
           node{
               id
               title
               variants(first: 5){
                   edges{
                       node{
                           priceV2{
                               amount
                           }
                       }
                   }
               }
           }
       }
   }
}`;

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