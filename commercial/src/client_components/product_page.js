// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
 
function ProductPage() {
  const [product, setProduct] = useState([]);
  console.log('product', product)
  const product_id = useLocation().state;
  // console.log('product ID', product_id)

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product', {id: product_id})
      .then((response) => {
        // console.log('response', response)
        setProduct(response.data.data.product)
      })
  },[]);

  let productData = false;
  if(product.length == 0){
    productData = false;
  }else{
    productData = true;
  }

  return (
    <div>
      <nav>
        <Link to='/client_landing' className='collectionLinks'>Main Page</Link>
        <Link to={'/product_collections'} className='collectionLinks'>Product Collections</Link>
      </nav>
      <h1>{product.title}</h1>
      {/* <p>{product.id}</p> */}
      <div>
        {productData ? 
          <div>
            <img src={product.featuredImage.url}></img>
            <p>{product.description}</p>
          </div>
        : <h2>...loading</h2>}
      </div>
      {}
    </div>
  );
}

export default ProductPage;