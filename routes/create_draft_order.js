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
    
    let draftOrder =` 
    mutation{
        draftOrderCreate(
            input: {
                note: "notes go here",
                customerId: "gid://shopify/Customer/5973979234340",
                ${draftOrderLineItems}
            }
        )
        {
            draftOrder{
                email
                id
            }
            userErrors{
                field
                message
                X-request-ID
            }
        }
    }
    `

    // let stringedDraftOrder = draftOrder.replace(/'/g, '"');
    console.log('stringed Draft Order', draftOrder)

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: draftOrder });
    // let customerId = res.data.data.customerCreate.customer;
    response.status(200).json(res.data);
    console.log('response here', JSON.parse(res.headers))
})

module.exports = router;