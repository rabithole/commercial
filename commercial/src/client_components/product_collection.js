import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id.js';

function ProductCollection() {
  const [product, setProducts] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [startCursor, setStartCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(null);

  const { company_shopify_id } = useContext(CompanyContext);
  const collection_id = useLocation().state;
  console.log('product', product);

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_collection_forward_pagination', {id: collection_id.id})
      .then((response) => {
        let endCursor = response.data.data.collection.products.pageInfo.endCursor;
        let startCursor = response.data.data.collection.products.pageInfo.startCursor;
        let hasPreviousPage = response.data.data.collection.products.pageInfo.hasPreviousPage;
        let hasNextPage = response.data.data.collection.products.pageInfo.hasNextPage;
        let products = response.data.data.collection.products.nodes;
        setEndCursor(endCursor);
        setStartCursor(startCursor);
        setHasNextPage(hasNextPage);
        setProducts(products);
        setHasPreviousPage(hasPreviousPage);
      })
      .catch((error) => {
        console.log('Error', error);
        alert("An error has occured. Please refresh the page!");
      })
  },[collection_id.id]);

  function nextPage(next) {
    setTimeout(() => {
      axios
        .post('http://localhost:5080/shopify_collection_forward_pagination', {id: collection_id.id, after: endCursor, before: startCursor})
        .then((response) => {
          console.log('start cursor', response.data.data.collection.products.pageInfo.startCursor);
          setStartCursor(response.data.data.collection.products.pageInfo.startCursor);
          setHasNextPage(response.data.data.collection.products.pageInfo.hasNextPage);
          setEndCursor(response.data.data.collection.products.pageInfo.endCursor);
          setHasPreviousPage(response.data.data.collection.products.pageInfo.hasPreviousPage);
          
          if(hasNextPage == false){
            alert("No more products in this collection");
          }else{
            setProducts(response.data.data.collection.products.nodes);
          }
        })
        .catch((error) => {
            console.log('Error again', error);
            alert("An error has occured. Please try again!");
          })
        },1000)
  }

  function previousPage(){
    console.log('previous page')

    setTimeout(() => {
      axios
        .post('http://localhost:5080/shopify_collection_backward_pagination', {id: collection_id.id, after: endCursor, before: startCursor})
        .then((response) => {
          console.log('start cursor', response.data.data.collection.products.pageInfo.startCursor);
          setHasNextPage(response.data.data.collection.products.pageInfo.hasNextPage);
          setStartCursor(response.data.data.collection.products.pageInfo.startCursor);
          setHasPreviousPage(response.data.data.collection.products.pageInfo.hasPreviousPage);
          setEndCursor(response.data.data.collection.products.pageInfo.endCursor);
          
          if(hasPreviousPage == false){
            alert("You are back at the beginning of the collection");
          }else{
            setProducts(response.data.data.collection.products.nodes);
          }
        })
        .catch((error) => {
            console.log('Error again', error);
            alert("An error has occured. Please try again!");
          })
        },1000)
  }

  let productData = false;
  if(product.length === 0){
    productData = false;
  }else{
    productData = true;
  }
 
  return (
    <div>
      <h1>{collection_id.title}</h1>
      <h3>SHOPIFY COMPANY ID: {company_shopify_id}</h3>
      <button onClick={() => previousPage('Previous page please')} id='nextPageButton'>Previous Page</button>
      <button onClick={() => nextPage('Yes, I want the next page')} id='nextPageButton'>Next Page</button>
      {productData ? <div className='collection_products'>
        {product.map((eachProduct) => {
          return <div className='collection_product' key={eachProduct.id}>
                    <Link to='/client_landing/product_page' state={eachProduct.id}>
                      <h4>{eachProduct.title}</h4>
                      <img src={eachProduct.images.edges[0].node.url} alt='product'></img>
                      <p>{eachProduct.id}</p>
                    </Link>
                  </div>
        })}
      </div>: <h2>...loading</h2>}

      <div className='popUp' id='popUp'>
        <h1>Gathering the next page of products...</h1>
      </div>
    </div>
  );
}

export default ProductCollection;