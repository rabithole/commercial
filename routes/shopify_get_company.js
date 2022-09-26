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
    let shopifId = JSON.stringify(request.body.id);
    console.log('The Requesting body, shopify_get_company.js', shopifId);

    let company = request.body;
    let getCompany =`{
            customer(id: ${shopifId}){
                id
                displayName
                firstName
                lastName
                email
                note
                tags
                addresses {
                    address1
                    address2
                    city
                    company
                    phone
                    zip
                    province
                    countryCodeV2
                }
            }
        }`

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: getCompany });
    response.status(200).json(res.data);
})
// Test

module.exports = router;