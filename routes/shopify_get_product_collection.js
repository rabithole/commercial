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
    let collectionId = JSON.stringify(request.body.id);

    let company = request.body;
    let getProductCollection =`{
           collection(id: ${collectionId}) {
                        id 
                        title
                        products(first: 30){
                            edges {
                                cursor
                            }
                            nodes{
                                title
                                id
                                images(first: 1){
                                    edges{
                                        cursor
                                        node{
                                            id
                                            url
                                        }
                                    }
                                }
                                variants(first: 10){
                                    nodes{
                                        id
                                        title
                                        sku
                                        selectedOptions {
                                            name
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                
            }`

	const ShopfyClient = axios.create({
		baseURL: BASE_URL,
		headers: headers
	});

    const res = await ShopfyClient.post(API_PATH, { query: getProductCollection });
    response.status(200).json(res.data);
  });

module.exports = router;