// import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id.js';

// let collection_id = 'gid://shopify/Collection/159766282276';

function ProductCollection() {
  const [category, setCategories] = useState([]);
  const [product, setProductTitle] = useState([]);
  const { company_shopify_id } = useContext(CompanyContext);
// console.log('Product Title State', variants)
  const collection_id = useLocation().state;

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id})
      .then((response) => {
        // console.log('Response', response) 
        setProductTitle(response.data.data.collection.products.nodes);
        console.log('response data', response.data.data.collection.products.nodes)
      })
      .catch((error) => {
        console.log('Error', error)
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
      <h1>{collection_id.title}</h1>
      <h3>SHOPIFY COMPANY ID: {company_shopify_id}</h3>
      {productData ? <div className='collectionProducts'>
        {product.map((singleProduct) => {
          return <div className='collectionProduct' key={singleProduct.id}>
                    <Link to='/client_landing/product_page' state={singleProduct.id}>
                      <h4>{singleProduct.title}</h4>
                      <img src={singleProduct.images.edges[0].node.url}></img>
                      <p>{singleProduct.id}</p>
                      {/*<p>Sku: {singleProduct.variants}</p>*/}
                    </Link>
                  </div>
        })}
      </div>: <h2>...loading</h2>}
    </div>
  );
}

export default ProductCollection;