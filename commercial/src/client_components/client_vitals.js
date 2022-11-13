// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProductCollections from './product_collections';
import { CompanyContext } from '../context/company_shopify_id';

function ClientVitals() {
  //company_shopify_id, cost_plus, localId
  const [companyInfo, setCompanyInfo] = useState();
  const [companyAddressField, setCompanyAddressField] = useState([]);
  console.log('companyInfo', companyInfo)

  let company_shopify_id = 'gid://shopify/Customer/5973979234340';

  useEffect(() => {
      axios
          .post('http://localhost:5080/shopify_get_company', {id: company_shopify_id})
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
      <h1>{companyData ? companyAddressField.company : '...loading'}</h1>
      <p>Welcome Back: <b>{companyInfo ? companyInfo.displayName : '...loading'}</b></p>
      <p>Balance Owed:</p>
      <p>List of orders:</p>
      <p>Add to order button for each product</p>
      <p>Orders Page:</p>
      <h3>Shopify Company ID: {company_shopify_id}</h3>
    </div>
  );
}

export default ClientVitals;