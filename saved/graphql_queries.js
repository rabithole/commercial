// To find total number of products in our store add this onto our base url. /admin/products/count.json
// Right now we have 904 total products. 


mutation {
  customerCreate (
    input: {
      firstName: "Bob",
      lastName: "Ross",
      email: "testCustomer@gmail.com"
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
}

// Format to send through http
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



// customerUpdate
mutation {
    customerUpdate(
        input: {
            id: "gid://shopify/Customer/5919707234340"
            firstName: "Jo Jo"
        }
    )
    {
        customer{
            id
            firstName
        }
    }
}


// Create company with primary contact. 
// Add primary contact to initial company creation process.
// Possibly add primary contact to company
const createCompanyQuery =`
    mutation {
      customerCreate (
        input: {
          firstName: "Bob",
          lastName: "Ross",
          email: "testCustomer@gmail.com"
          note: "This is a test customer created from Postman using GraphQL"
          tags: "commercial"
          addresses: [
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
          ]
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
    }
`

// Get customer by id
{
    customer(id: "gid://shopify/Customer/5461486043172"){
        id
        displayName
        amountSpent{
            amount
        }
    }
}


// Get orders using query.
{
    orders(first: 100, query:"channelName:Online Store"){
        edges{
            node{
                name
                id
                totalWeight
                channelInformation{
                    channelDefinition{
                        channelName
                    }
                }
            }
        }
    }
}


// Grabs list of customers with a query.
{
    customers(first: 60, reverse: true, query:"tag:commercial") {
        nodes{
            id
            displayName
            tags
            orders(first: 10) {
                nodes{
                    name
                    totalWeight
                }
            }
            amountSpent{
                amount
            }
            addresses{
                address1
            }
            email
        }
    }
}

// List of first five products.
{
   products(first: 5) {
       edges{
           node{
               id
               title
               variants(first: 5){
                   edges{
                       node{
                           priceV2{
                               amount
                           }
                       }
                   }
               }
           }
       }
   }
}

const productQuery = `{
    inventoryItems(first: 5) {
        edges{
            node{
                id,
                tracked,
                sku,
                variant{
                    title,
                    displayName,
                    price
                }
                unitCost{
                    amount
                    currencyCode
                }
            }
        }
    }
}`;


// Collections 
{
   collections(first: 30) {
       edges {
           node {
               id
               title
           }
       }
   }
}