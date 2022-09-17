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
    
    console.log('Request body', request.body)

    let company = request.body;
    let getCompany =`{
            customer(id: "gid://shopify/Customer/5935265742884"){
                id
                displayName
            }
        }`

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: getCompany });
    response.status(200).json(res.data);
})

module.exports = router;