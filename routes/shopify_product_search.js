const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://discount-indoor-gardening.myshopify.com';
const API_PATH = '/admin/api/2022-07/graphql.json';
const headers = {
	'Content-Type': 'application/json',
	'X-Shopify-Access-Token': process.env.ADMIN_API_KEY
}

router.use(express.json());

router.post('/', async (request, response) => {
    let wordSearch = JSON.stringify(request.body);

    let company = request.body;
    let searchShopifyProducts =`
        query($products: String){
            products(query: $products, first: 20){
                edges{
                    node{
                        id
                        title
                    }
                }
            }
        }
    `

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    let variables = {
        "product": wordSearch
    }

    const res = await ShopfyClient.post(API_PATH, { query: searchShopifyProducts });
    response.status(200).json(res.data);
  });

module.exports = router;