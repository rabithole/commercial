// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let shopify_id = 'gid://shopify/Customer/5949135880228';

function ProductCategories() {
  const [category, setCategories] = useState([]);
  console.log('category', category);

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_categories', {id: shopify_id})
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
      <h1>Product Categories</h1>
      <nav>
        <Link to='/client_landing'>Main Page</Link>
      </nav>
      <div className='product_categories'>{category.map((cat) => {
        return  <Link 
                  to={`/product_collection/${cat.id}`} 
                  style={{display: 'block'}} 
                  key={cat.id}>{cat.title}
                </Link>;
      })}</div>
    </div>
  );
}

export default ProductCategories;