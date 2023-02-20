import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id.js';

function ProductCollection() {
  const [product, setProducts] = useState([]);
  const { company_shopify_id } = useContext(CompanyContext);
  const collection_id = useLocation().state;

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id})
      .then((response) => {
        console.log('Has Next Page', response.data.data.collection)
        setProducts(response.data.data.collection.products.nodes);
      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[collection_id.id]);

  let productData = false;
  if(product.length === 0){
    productData = false;
  }else{
    productData = true;
  }
 
  return (
    <div>
      <h1>{collection_id.title}</h1>
      <h3>SHOPIFY COMPANY ID: {company_shopify_id}</h3>
      {productData ? <div className='collection_products'>
        {product.map((eachProduct) => {
          return <div className='collection_product' key={eachProduct.id}>
                    <Link to='/client_landing/product_page' state={eachProduct.id}>
                      <h4>{eachProduct.title}</h4>
                      <img src={eachProduct.images.edges[0].node.url} alt='product'></img>
                      <p>{eachProduct.id}</p>
                    </Link>
                  </div>
        })}
      </div>: <h2>...loading</h2>}
    </div>
  );
}

export default ProductCollection;