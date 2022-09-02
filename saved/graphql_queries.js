 addresses: [
        {
            address1: "450 Stoung Lane"
            city: "La La Land"
            company: "Dream Land"
            phone: "4533224556"
            zip: "87837"
        }
      ]


mutation {
  customerCreate (
    input: {
      firstName: "Bob",
      lastName: "Ross",
      email: "testCustomer@gmail.com"
      note: "This is a test customer created from Postman using GraphQL"
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