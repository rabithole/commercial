// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ClientLanding() {
  //shopify_id, cost_plus, localId
  const [companyInfo, setCompanyInfo] = useState();
  const [companyAddressField, setCompanyAddressField] = useState([]);
  console.log('companyInfo', companyInfo)

  let shopify_id = 'gid://shopify/Customer/5973979234340';

  useEffect(() => {
      axios
          .post('http://localhost:5080/shopify_get_company', {id: shopify_id})
          .then((response) => {
            console.log('response data admin', response.data.data.customer)
            let companyInfo = response.data.data.customer;
            setCompanyInfo(companyInfo);
            // let localCompanyId = {localCompanyId: localId};
            companyInfo.addresses.map((company) => {
              // setAddressData(company);
              console.log(company)
              setCompanyAddressField(company)
            })
          })
          .catch((error) => {
            console.log('Error', error)
          })
  },[]);

  function callStorefrontApi(){
    axios
      .get('http://localhost:5080/storefront_api')
      .then(function(response) {
        console.log('Response storefront api', response.data.data)
      })
      .catch(error => {
        console.log('Error', error)
      })
  }
  console.log('companyData', companyAddressField.length, companyAddressField.company)

  let companyData = false;
  if(companyAddressField.length == 0){
    console.log('false');
    companyData = false;
  } else {
    console.log('true');
    companyData = true;
  }

  return (
    <div>
      <p>Client Landing Page with list of client MVP's</p>
      <h1>{companyData ? companyAddressField.company : 'false'}</h1>
      <p>Welcome Back: <b>{companyInfo ? companyInfo.displayName : false}</b></p>
      <div className='product_collections'>
        <Link to='/product_collections'>Product Collections</Link>
      </div>
      <p>Balance Owed:</p>
      <p>List of orders:</p>
      <p>Add to order button for each product</p>
      <p>Orders Page:</p>
    </div>
  );
}

export default ClientLanding;