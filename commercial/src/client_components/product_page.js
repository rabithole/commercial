// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
 
function ProductPage() {
  const [product, setProduct] = useState([]);
  const [productCost, setProductCost] = useState([]);
  const [loading, setLoading] = useState(true);
  let clientMarkup = .1;
  // console.log('loading', loading)
  // console.log('product variants', product.variants)
  // console.log('Product Cost', productCost)
  const product_id = useLocation().state;
  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product', {id: product_id})
      .then((response) => {
        // console.log('variant length', response.data.data.product.variants.edges.length)
        setProduct(response.data.data.product)
        let variantArrayLength = response.data.data.product.variants.edges.length;
        let variants = response.data.data.product.variants.edges;
        let array = [];
        variants.map(cost => {
          let sku = cost.node.sku;
          let requestSku = cost.node.sku;
          let title = cost.node.title;
          axios
            .get('http://localhost:5080/costs_by_sku/' + requestSku)
            .then(function(response) {
              let product_cost = response.data.unit_cost;
              array.push({sku, title, product_cost})
              setProductCost(array)
              if(array.length == variantArrayLength){
                setLoading(false);
              }else{
                setLoading(true);
              }
              
            })
            .catch((err) => {
              console.log('error', err)
            })
          })
      })
  },[]);

  let productData = false;
  if(loading){
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
                console.log('product cost map', variant.title, +variant.product_cost)
                return  <p key={index}>{variant.title}: Your Cost: { (+variant.product_cost * clientMarkup + +variant.product_cost).toFixed(2) }</p>
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