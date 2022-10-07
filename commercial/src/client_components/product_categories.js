// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let shopify_id = 'gid://shopify/Customer/5949135880228';

function ProductCategories() {
  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_categories', {id: shopify_id})
      .then((response) => {
        console.log('response data product categories', response.data.data.collections.edges)
        let productCategories = response.data.data.collections.edges;
        productCategories.map(category => {
          let categories = category.node.title;
          console.log('category', categories)
        })

      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[]);
 
  return (
    <div>
      <h1>Product Categories</h1>
      <Link to='/client_landing'>Main Page</Link>
      
    </div>
  );
}

export default ProductCategories;

// onClick={getShopifyCompanyData}