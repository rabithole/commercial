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

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id})
      .then((response) => {
  console.log('Response', response)
        setProductTitle(response.data.data.collection.products.nodes);
        console.log('image', response.data.data.collection.products.nodes[0].images.edges[0].node.url)
        return productTitle;
      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[]);
 
  return (
    <div>
      <nav>
        <Link to='/client_landing' className='collectionLinks'>Main Page</Link>
        <Link to={'/product_categories'} className='collectionLinks'>Product Categories</Link>
      </nav>
      <h2>{collection_id.title}</h2>
      <div className='collectionProducts'>
        {productTitle.map((prodTitle) => {
          return <div 
                    className='collectionProduct' 
                    key={prodTitle.id}>
                    <p>{prodTitle.title}</p>
                    <img src={prodTitle.images.edges[0].node.url}></img>
                  </div>
        })}
      </div>
    </div>
  );
}

export default ProductCollection;