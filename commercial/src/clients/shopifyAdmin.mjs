const BASE_URL = 'https://discount-indoor-gardening.myshopify.com';
const API_PATH = '/admin/api/2022-07/graphql.json';
const headers = {
	'Content-Type': 'application/json',
	'X-Shopify-Access-Token': process.env.ADMIN_API_KEY
}

function ShopfyAdminClient(){
    const client = axios.create({
            baseURL: BASE_URL,
            headers: headers
        });

    function createDraftOrder(variables){
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
        return client.post(API_PATH, { 
            query: query,
            variables: variables
        });
    }
}

export default ShopfyAdminClient;
