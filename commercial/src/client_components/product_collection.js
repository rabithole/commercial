import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id.js';

function ProductCollection() {
  const [product, setProducts] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [previousCursor, setPreviousCursor] = useState(null);

  const { company_shopify_id } = useContext(CompanyContext);
  const collection_id = useLocation().state;

  console.log('end Cursor', endCursor)
  console.log('has next page---', hasNextPage)

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id})
      .then((response) => {
        let endCursor = response.data.data.collection.products.pageInfo.endCursor;
        let hasNextPage = response.data.data.collection.products.pageInfo.hasNextPage;
        let products = response.data.data.collection.products.nodes;
        setEndCursor(endCursor);
        setHasNextPage(hasNextPage);
        setProducts(products);
      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[collection_id.id]);

  function nextPage(next) {
    // let popup = document.getElementById('popUp');
    // console.log('pop up', popup.classList)
    // popup.classList.toggle("show")
    console.log('request again')

    setTimeout(() => {
      axios
        .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id, after: endCursor})
        .then((response) => {
          setHasNextPage(response.data.data.collection.products.pageInfo.hasNextPage);
          setEndCursor(response.data.data.collection.products.pageInfo.endCursor);
          
          if(hasNextPage == false){
            alert("No more products in this collection")
          }else{
            setProducts(response.data.data.collection.products.nodes);
          }
        })
        .catch((error) => {
            console.log('Error again', error)
            alert("An error has occured. Please try again!")
          })
        },4000)
  }

  function previousPage(){
    console.log('previous page')
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