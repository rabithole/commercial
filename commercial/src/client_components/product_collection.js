// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// let collection_id = 'gid://shopify/Collection/159766282276';

function ProductCollection() {
  const [category, setCategories] = useState([]);
  const [productTitle, setProductTitle] = useState([]);
  // const [variants, setVariants] = useState([]);
// console.log('Product Title State', variants)
  const collection_id = useLocation().state;

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id})
      .then((response) => {
console.log('Response', response) 
        setProductTitle(response.data.data.collection.products.nodes);
console.log('response data', response.data.data.collection.products.nodes)

        // return productTitle;
      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[]);
 
  let variants = [];

//   function processVariants() {
//     productTitle.map((variant) => {
// console.log('variants', variant.variants.nodes)
//       variants = variant.variants.nodes;
//       // console.log(variants.title)
//     })
//   }

//   processVariants();

  return (
    <div>
      <nav>
        <Link to='/client_landing' className='collectionLinks'>Main Page</Link>
        <Link to={'/product_categories'} className='collectionLinks'>Product Categories</Link>
      </nav>
      <h1>{collection_id.title}</h1>
      <div className='collectionProducts'>
        {productTitle.map((prodTitle) => {
          return <div className='collectionProduct' key={prodTitle.id}>
                    <h4>{prodTitle.title}</h4>
                    <img src={prodTitle.images.edges[0].node.url}></img>
                  </div>
        })}
      </div>
    </div>
  );
}

export default ProductCollection;