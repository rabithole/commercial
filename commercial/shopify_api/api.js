import axios from 'axios';

export default function() {
	return axios.create({
		baseURL: 'https://discount-indoor-gardening.myshopify.com/admin/api/2022-07/graphql.json',
		headers: {
			X-Shopify-Access-Token: 
		}
	})
}