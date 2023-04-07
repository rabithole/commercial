import React, { useEffect, useState, useContext } from 'react';
import {  } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id';

function ClientVitals() {
  const { company_shopify_id, companyInfo, companyAddressField } = useContext(CompanyContext);

  useEffect(() => {
    
  },[]);

  let companyData = false;
  if(companyAddressField.length === 0){
    companyData = false;
  } else {
    companyData = true;
  }

  return (
    <div className='client_vitals'>
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