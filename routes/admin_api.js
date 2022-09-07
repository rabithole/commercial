const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://discount-indoor-gardening.myshopify.com';
const API_PATH = '/admin/api/2022-07/graphql.json';
const headers = {
	'Content-Type': 'application/json',
	'X-Shopify-Access-Token': process.env.ADMIN_API_KEY
}
// const productQuery = `{
//     inventoryItems(first: 5) {
//         edges{
//             node{
//                 id,
//                 tracked,
//                 sku,
//                 variant{
//                     title,
//                     displayName,
//                     price
//                 }
//                 unitCost{
//                     amount
//                     currencyCode
//                 }
//             }
//         }
//     }
// }`;

const createCompanyQuery = `
mutation {
  customerCreate (
    input: {
      firstName: "Bob",
      lastName: "Ross",
      email: "testingCustomer@gmail.com"
      note: "This is a test customer created from Postman using GraphQL"
      addresses: 
          {
              address1: "389 La La Land"
              address2: "Apartment 2"
              city: "Portland"
              company: "DIG"
              phone: "3606005862"
              zip: "98607"
              provinceCode: "AL"
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

router.use(express.json());

router.post('/', async (request, response) => {
    console.log('Request body', request.body)
    let company = request.body;
    let newCompany =` 
            mutation {
              customerCreate (
                input: {
                    firstName: ${JSON.stringify(company.input.first_name)},
                    lastName: ${JSON.stringify(company.input.last_name)},
                    email: ${JSON.stringify(company.input.email)},
                    note: ${JSON.stringify(company.addresses.notes)}
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

    console.log('New Company', newCompany)

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

	const res = await ShopfyClient.post(API_PATH, { query: newCompany });
        response.status(200).json(res.data);
        console.log('Res.data', res.data)
})

module.exports = router;