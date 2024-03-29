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

  console.log('response data---', response.data)
    
    let company = request.body;
    console.log('company data ---', company.input.first_name)
    let newCompany =` 
            mutation {
              customerCreate (
                input: {
                    firstName: ${JSON.stringify(company.input.first_name)},
                    lastName: ${JSON.stringify(company.input.last_name)},
                    email: ${JSON.stringify(company.input.email)},
                    note: ${JSON.stringify(company.addresses.note)},
                    tags: ${JSON.stringify(company.input.tags)},
                    addresses: 
                        {
                            address1: ${JSON.stringify(company.addresses.address1)},
                            address2: ${JSON.stringify(company.addresses.address2)},
                            city: ${JSON.stringify(company.addresses.city)},
                            company: ${JSON.stringify(company.addresses.company)},
                            phone: ${JSON.stringify(company.input.phone)},
                            zip: ${JSON.stringify(company.addresses.zip)},
                            provinceCode: ${JSON.stringify(company.addresses.state)},
                            countryCode: US
                        }
                    }
                ) 
              {
                customer {
                  id
                  firstName
                  lastName
                  email
                }
                userErrors {
                  field
                  message
                }
              }
            }`

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: newCompany });
    let customerId = res.data.data.customerCreate.customer;
    response.status(201).json(customerId);  
})

module.exports = router;