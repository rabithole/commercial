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
    
    let company = request.body;
    let newCompany =` 
    mutation{
        draftOrderCreate(
            input: {
                note: "notes go here",
                customerId: "gid://shopify/Customer/5973979234340"
                
                lineItems: [{
                    quantity: 2,
                    sku: "600350",
                    title: "Amino Treatment",
                    originalUnitPrice: 74.09
                },
                {
                    quantity: 2,
                    sku: "720357",
                    title: "Apollo Timers",
                    originalUnitPrice: 22.89
                },
                {
                    quantity: 1,
                    sku: "600751",
                    title: "Alfafa Meal",
                    originalUnitPrice: 10.89
                },
                {
                    quantity: 1,
                    sku: "600212",
                    title: "Aqua Flakes A & B",
                    originalUnitPrice: 71.29
                }]
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
            }
        }
    }
    `

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: newCompany });
    let customerId = res.data.data.customerCreate.customer;
    response.status(201).json(customerId);  
})

module.exports = router;