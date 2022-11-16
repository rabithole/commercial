import React, { useEffect, useState, useContext } from 'react';
import {  } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id';

function ClientVitals() {
  const [companyInfo, setCompanyInfo] = useState();
  const [companyAddressField, setCompanyAddressField] = useState([]);
  const { company_shopify_id } = useContext(CompanyContext);

  useEffect(() => {
      axios
          .post('http://localhost:5080/shopify_get_company', {id: company_shopify_id})
          .then((response) => {
            let companyInfo = response.data.data.customer;
            setCompanyInfo(companyInfo);
            companyInfo.addresses.map((company) => {
              setCompanyAddressField(company)
            })
          })
          .catch((error) => {
            console.log('Error', error)
          })
  },[company_shopify_id]);

  let companyData = false;
  if(companyAddressField.length === 0){
    companyData = false;
  } else {
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