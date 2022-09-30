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
    let shopifId = JSON.stringify(request.body.updateContact.shopify_id);
    console.log('Request body, shopify_update_company.js', request.body);
    console.log('Shopify ID', shopifId)
    let company = request.body;
    let updateCompany =`
        mutation {
            customerUpdate(input: {id: ${shopifId}, 
                    firstName: ${JSON.stringify(company.updateContact.firstName)},
                    lastName: ${JSON.stringify(company.updateContact.lastName)},
                    email: ${JSON.stringify(company.updateContact.email)},
                    note: ${JSON.stringify(company.updateContact.note)},
                    tags: [${JSON.stringify(company.updateContact.tags)}],
                    addresses: 
                        {
                            address1: ${JSON.stringify(company.updateAddress.address1)},
                            address2: ${JSON.stringify(company.updateAddress.address2)},
                            city: ${JSON.stringify(company.updateAddress.city)},
                            company: ${JSON.stringify(company.updateAddress.company)},
                            phone: ${JSON.stringify(company.updateAddress.phone)},
                            zip: ${JSON.stringify(company.updateAddress.zip)},
                            provinceCode: ${JSON.stringify(company.updateAddress.provinceCode)},
                            countryCode: US
                        }
                    })
                    {
                        customer {
                            id 
                            firstName
                        }
                        userErrors{
                            field
                            message
                        }
                    }
                }`

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: updateCompany });
    response.status(200).json(res.data);
})

module.exports = router;