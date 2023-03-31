import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id';

function ProductCollections() {
  const { company_shopify_id } = useContext(CompanyContext);
  const [category, setCategories] = useState([]);
  const [searchWord, setSeachWord] = useState('');
  console.log('search words array', searchWord)

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
  },[company_shopify_id]);

  let categoryData = false;
  if(category.length === 0){
    categoryData = false;
  }else{
    categoryData = true;
  }

  function getSearchWord(event){
    let inputValue = event.target.value;
    console.log("input value---", inputValue)
    
    axios 
      .post('http://localhost:5080/shopify_product_search', inputValue)
      .then((response) => {
        console.log("console log response", response.data.data.products.edges)
        let productSearch = response.data.data.products.edges;
        let productSearchArray = [];
        for(let i = 0; i < productSearch.length; i++){
          productSearchArray.push(productSearch[i].node)
        }
        setSeachWord(productSearchArray);
      })
      .catch((error) => {
        console.log('Error', error);
      })
      event.preventDefault();
  }

  let productData = false;
  if(searchWord.length === 0){
    productData = false;
  }else{
    productData = true;
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
        <input type='text' id='product_search' name='productSearch' onSubmit={getSearchWord}></input>
      </form>

      {productData ? <div>
        {searchWord.map((eachProduct) => {
          return <p key={eachProduct.id}>{eachProduct.title}</p>
        })}
      </div>: <h2></h2>}
    </div>
  );
}

export default ProductCollections;