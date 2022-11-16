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
    let product_id = JSON.stringify(request.body.id);

    let getProduct =`{
           product(id: ${product_id}) {
               id 
               title
               description
               featuredImage{
                url
               }
               variants(first: 30){
                edges{
                    node{
                        id 
                        title
                        sku
                    }
                }
               }
           }
        }`

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: getProduct });
    response.status(200).json(res.data);
  });

module.exports = router;