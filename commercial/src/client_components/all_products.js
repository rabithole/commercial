import React, {  } from 'react';
import { Link } from 'react-router-dom';

function AllProducts() {
 
  return (
    <div>
      <h1>All Products Page</h1>
      <Link to='/client_landing'>Main Page</Link>
    </div>
  );
}

export default AllProducts;