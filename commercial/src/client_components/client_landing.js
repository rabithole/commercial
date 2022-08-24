// import './App.css';
import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ClientLanding() {
  
  function callShopifyApi(){
    axios
      .get('http://localhost:5080/client')
      .then(function(response) {
        console.log('Response', response.data)
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
      <button onClick={callShopifyApi}>Testing API</button>
    </div>
  );
}

export default ClientLanding;
