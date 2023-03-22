import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id.js';

function ProductCollection() {
  const [product, setProducts] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { company_shopify_id } = useContext(CompanyContext);
  const collection_id = useLocation().state;
  console.log("collection id----", collection_id);

  // let endCursor = null;
  // let hasNextPage = false;
  console.log('end Cursor', endCursor)
  console.log('has next page---', hasNextPage)

  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id})
      .then((response) => {
        setEndCursor(response.data.data.collection.products.pageInfo.endCursor);
        setHasNextPage(response.data.data.collection.products.pageInfo.hasNextPage);

        // console.log('Has Next Page', response.data.data.collection.products.pageInfo)

        setProducts(response.data.data.collection.products.nodes);
      })
      .catch((error) => {
        console.log('Error', error)
      })
  },[collection_id.id]);

  function nextPage(next) {
    console.log(next)
    axios
    .post('http://localhost:5080/shopify_get_product_collection', {id: collection_id.id, after: endCursor})
    .then((response) => {
      setEndCursor(response.data.data.collection.products.pageInfo.endCursor);
      setHasNextPage(response.data.data.collection.products.pageInfo.hasNextPage);

      // console.log('Next Page Function', response.data.data.collection.products.pageInfo)
      // console.log('end cursor in next page function', endCursor)
      // console.log('has next page', hasNextPage)

      setProducts(response.data.data.collection.products.nodes);
    })
    .catch((error) => {
      console.log('Error', error)
    })
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
    </div>
  );
}

export default ProductCollection;