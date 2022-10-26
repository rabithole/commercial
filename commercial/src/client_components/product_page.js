// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function ProductPage() {
  const [product, setProduct] = useState([]);
  // console.log('product', product)
  const product_id = useLocation().state;
  // console.log('product ID', product_id)

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product', {id: product_id})
      .then((response) => {
        // console.log('response', response)
        setProduct(response.data.data.product)
      })

    // axios
    //     .post('http://localhost:5080/shopify_get_all_unit_costs')
    //     .then((response) => {
    //         console.log('Inventory Items response', response)
    //         console.log('Has Next Page', response.data.data.inventoryItems.pageInfo.hasNextPage)

    //     })
  },[]);

  return (
    <div>
      <nav>
        <Link to='/client_landing' className='collectionLinks'>Main Page</Link>
        <Link to={'/product_collections'} className='collectionLinks'>Product Collections</Link>
      </nav>
      <h1>{product.title}</h1>
      {/*<button onClick={getUnitCosts}>Get Unit Costs</button>*/}
    </div>
  );
}

export default ProductPage;