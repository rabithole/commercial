const express = require('express');
const axios = require('axios');
const uuid = require('uuid');

const router = express.Router();

const BASE_URL = 'https://discount-indoor-gardening.myshopify.com';
const API_PATH = '/admin/api/2022-07/graphql.json';
const headers = {
	'Content-Type': 'application/json',
	'X-Shopify-Access-Token': process.env.ADMIN_API_KEY,
    'X-request-ID': uuid
}

router.use(express.json());

router.post('/', async (request, response) => {
    let draftOrderLineItems = request.body;
    console.log('draft order request', draftOrderLineItems);
    console.log('new draft', draftOrderLineItems.lineItems[0])                    
    
    let query =` 
    mutation draftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input: $input)
        {
            draftOrder{
                email
                id
            }
            userErrors{
                field
                message
            }
        }
    }
    `
    let variables = {
        input: {
            note: "notes go here",
            customerId: "gid://shopify/Customer/5973979234340",
            lineItems: draftOrderLineItems.lineItems
        }
    };

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { 
        query: query,
        variables: variables
    });
    // let customerId = res.data.data.customerCreate.customer;
    response.status(200).json(res.data); // Remember to add error handling!
    let xRequest = JSON.stringify(res.headers);
    xRequest = JSON.parse(xRequest);
    console.log('response here', xRequest['x-request-id'])
})

module.exports = router;