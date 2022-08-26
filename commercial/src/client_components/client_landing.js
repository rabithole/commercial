// import './App.css';
import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ClientLanding() {
  
  function callAdminApi(){
    axios
      .get('http://localhost:5080/admin_api')
      .then(function(response) {
        console.log('Response admin api', response.data.data)
      })
      .catch(error => {
        console.log('Error', error)
      })
  }

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

  return (
    <div>
      <h1>Client Landing Page with list of client MVP's</h1>
      <p>Company Name</p>
      <p>Product Pages</p>
      <p>Balance Owed</p>
      <p>List of orders</p>
      <p>Add to order button for each product</p>
      <p>Orders Page</p>
      <button onClick={callAdminApi}>Admin API</button>
      <button onClick={callStorefrontApi}>Store Front API</button>
    </div>
  );
}

export default ClientLanding;
