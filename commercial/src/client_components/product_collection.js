// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// let collection_id = 'gid://shopify/Collection/159766282276';

function ProductCollection() {
  const [category, setCategories] = useState([]);
  const [product, setProductTitle] = useState([]);
// console.log('Product Title State', variants)
  const collection_id = useLocation().state;

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id})
      .then((response) => {
console.log('Response', response) 
        setProductTitle(response.data.data.collection.products.nodes);
console.log('response data', response.data.data.collection.products.nodes)

        // return product;
      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[]);
 
  return (
    <div>
      <nav>
        <Link to='/client_landing' className='collectionLinks'>Main Page</Link>
        <Link to={'/product_collections'} className='collectionLinks'>Product Collections</Link>
      </nav>
      <h1>{collection_id.title}</h1>
      <div className='collectionProducts'>
        {product.map((singleProduct) => {
          return <div className='collectionProduct' key={singleProduct.id}>
                    <Link to={'/product_page'} state={singleProduct.id}>
                      <h4>{singleProduct.title}</h4>
                      <img src={singleProduct.images.edges[0].node.url}></img>
                      <p>{singleProduct.id}</p>
                      {/*<p>Sku: {singleProduct.variants}</p>*/}
                    </Link>
                  </div>
        })}
      </div>
    </div>
  );
}

export default ProductCollection;