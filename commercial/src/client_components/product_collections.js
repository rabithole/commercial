// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let shopify_customer_id = 'gid://shopify/Customer/5949135880228';

function ProductCollections() {
  const [category, setCategories] = useState([]);
  const [collectionShopifyId, setShopifyCollectionId] = useState();
  // console.log('category', category);

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collections', {id: shopify_customer_id})
      .then((response) => {
        let productCategories = response.data.data.collections.edges;
        let categories = [];
        for(let i = 0; i < productCategories.length; i++){
          categories.push(productCategories[i].node)
        }
        setCategories(categories)
      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[]);
 
  return (
    <div>
      <h1>Product Collections</h1>
      <nav>
        <Link to='/client_landing' className='collectionLinks'>Main Page</Link>
      </nav>
      <div className='product_collections'>{category.map((collection) => {
        return  <Link 
                  state={collection}
                  to={`/product_collection`} 
                  style={{display: 'block'}} 
                  key={collection.id}>{collection.title}
                </Link>;
      })}</div>

      <form className='product_search'>
        <label >Search for products</label>
        <input type='text' id='product_search' name='productSearch'></input>
      </form>
    </div>
  );
}

export default ProductCollections;