// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
 
function ProductPage() {
  const [product, setProduct] = useState([]);
  // const [variants, setVariants] = useState([]);
  const [productCost, setUnitCost] = useState([]);
  // console.log('product', product)
  console.log('unitCost here', productCost)
  const product_id = useLocation().state;
  // console.log('product ID', product_id)

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product', {id: product_id})
      .then((response) => {
        // console.log('variant sku', response.data.data.product.variants.edges[0].node.sku)
        setProduct(response.data.data.product)
        // setVariants(response.data.data.product.variants.edges)
        let variants = response.data.data.product.variants.edges;
        let array = [];
        variants.map(cost => {
          // console.log('title', cost.node)
          let sku = cost.node.sku;
          let requestSku = cost.node.sku;
          let title = cost.node.title;
          axios
            .get('http://localhost:5080/costs_by_sku/' + requestSku)
            .then(function(response) {
              // console.log('response', response.data.unit_cost)
              let product_cost = response.data.unit_cost;
              array.push({sku, title, product_cost})
              setUnitCost(array)
            })
            .catch((err) => {
              console.log('error', err)
            })
          })
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
            <p>Variants and pricing:</p>
              {productCost.map((variant, index) => {
                return  <p key={index}>{variant.title}: {variant.product_cost}</p>
              })}
            <p>{product.description}</p>
          </div>
        : <h2>...loading</h2>}
      </div>
      {}
    </div>
  );
}

export default ProductPage;