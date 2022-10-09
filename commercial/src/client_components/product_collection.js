// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// let collection_id = 'gid://shopify/Collection/159766282276';

function ProductCollection() {
  const [category, setCategories] = useState([]);
  const [productTitle, setProductTitle] = useState([]);
console.log('Product Title State', productTitle)
  const collection_id = useLocation().state;
console.log(collection_id.id)

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id})
      .then((response) => {
  console.log('Response', response)
        setProductTitle(response.data.data.collection.products.nodes)
  console.log('productTitle', productTitle)
        return productTitle;
      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[]);
 
  return (
    <div>
      <h1>Product Categories</h1>
      <nav>
        <Link to='/client_landing' className='collectionLinks'>Main Page</Link>
        <Link to={'/product_categories'} className='collectionLinks'>Back To Prduct Categories</Link>
      </nav>
      <h2>{collection_id.title}</h2>
      <div className='collectionProducts'>
        {productTitle.map((prodTitle) => {
          return <p className='collectionProduct' key={prodTitle.id}>{prodTitle.title}</p>
        })}
      </div>
    </div>
  );
}

export default ProductCollection;