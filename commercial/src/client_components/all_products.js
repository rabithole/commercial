// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AllProducts() {
 
  return (
    <div>
      <h1>All Products Page</h1>
      <Link to='/client_landing'>Main Page</Link>
    </div>
  );
}

export default AllProducts;

// onClick={getShopifyCompanyData}