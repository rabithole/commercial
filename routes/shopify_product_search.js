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
    console.log('request', request.body)
    let wordSearch = JSON.stringify(request.body);
    console.log('word search variable', wordSearch)

    let company = request.body;
    let searchShopifyProducts =`
        query productSearch($products: String){
            products(query: $products, first: 10){
                edges{
                    node{
                        id
                        title
                        featuredImage{
                            url
                        }
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
        "products": wordSearch
    }

    const res = await ShopfyClient.post(API_PATH, { query: searchShopifyProducts });
    response.status(200).json(res.data);
  });

module.exports = router;