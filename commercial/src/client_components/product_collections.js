// import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id';
import ProductCollection from './product_collection';

function ProductCollections() {
  const { company_shopify_id } = useContext(CompanyContext);
  console.log('shopify customer id:', company_shopify_id)

  const [category, setCategories] = useState([]);
  const [collectionShopifyId, setShopifyCollectionId] = useState();

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collections', {id: company_shopify_id})
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

  let categoryData = false;
  if(category.length == 0){
    categoryData = false;
  }else{
    categoryData = true;
  }
 
  return (
    <div>
      <h1>Product Collections</h1>
      <div className='product_collections'>{categoryData ? category.map((collection) => {
        return  <Link 
                  state={collection}
                  to={`/client_landing/product_collection`} 
                  style={{display: 'block'}} 
                  key={collection.id}>
                  {collection.title}
                </Link>;
      }) : <h2>...loading</h2>}</div>

      <h3>SHOPIFY COMPANY ID: {company_shopify_id}</h3>

      <form className='product_search'>
        <label >Search for products</label>
        <input type='text' id='product_search' name='productSearch'></input>
      </form>
    </div>
  );
}

export default ProductCollections;