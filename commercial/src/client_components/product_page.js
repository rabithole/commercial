import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id.js';
 
function ProductPage(props) {
  const [product, setProduct] = useState([]);
  const [productCost, setProductCost] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [quantity, setQuantity] = useState(1);
  // console.log('quantity', quantity)
  const { company_shopify_id, cost_plus } = useContext(CompanyContext);
  let clientMarkup = cost_plus / 100;
  console.log(clientMarkup)

  const product_id = useLocation().state;
  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product', {id: product_id})
      .then((response) => {
        setProduct(response.data.data.product)
        let variantArrayLength = response.data.data.product.variants.edges.length;
        let variants = response.data.data.product.variants.edges;
        let array = [];
        variants.map(cost => {
          let sku = cost.node.sku;
          let requestSku = cost.node.sku;
          let title = cost.node.title;
          axios
            .get('http://localhost:5080/costs_by_sku/' + requestSku)
            .then(function(response) {
              let product_cost = response.data.unit_cost;
              array.push({sku, title, product_cost})
              setProductCost(array)
              if(array.length === variantArrayLength){
                setLoading(false);
              }else{
                setLoading(true);
              }
              
            })
            .catch((err) => {
              console.log('error', err)
            })
          })
      })

      
  },[product_id]);

  async function create_draft_order(draft_order){
    console.log('create draft order function')
    await axios.post('http://localhost:5080/create_draft_order', draft_order)
      .then((response) => {
        console.log('create draft order response in product page')
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  let productData = false;
  if(loading){
    productData = false;
  }else{
    productData = true;
  }

  function grabProductDetails(variant, e){
    console.log('cost', variant.variant.product_cost, variant)
    // let productCost = (variant.variant.product_cost * clientMarkup) + variant.variant.product_cost;
    let productCost = (variant.variant.product_cost * clientMarkup + +variant.variant.product_cost).toFixed(2);
    let sku = variant.variant.sku;
    let test = document.querySelectorAll('input')
    let index = document.querySelector('name')
    console.log('test', test, index)

    let input = {
      lineItems: [{
        originalUnitPrice: productCost,
        sku: sku,
        title: product.title
        // quantity: target
      }]
    }

    create_draft_order(
      input
    );
  }
  // let quantityArray = document.getElementsByClassName('add_to_order');

  let quantity = 0;
  let checkIndex = 0;
  function decrement(index){
    let quantityArray = document.querySelectorAll('.add_to_order')[index].childNodes[3];
    console.log('Quantity array', quantityArray, 'index', index)
    if(checkIndex == index){
      quantity = quantity - 1;
      if(quantity < 0){
        quantity = 0;
      }
      quantityArray.innerHTML = quantity;
    }else {
      checkIndex = index;
      quantity = Number(quantityArray.innerHTML);
      quantity = quantity - 1;
      if(quantity < 0){
        quantity = 0;
      }
      quantityArray.innerHTML = quantity;
    }
  }

  function increment(index){
    let quantityArray = document.querySelectorAll('.add_to_order')[index].childNodes[3];
    console.log('Quantity array', quantityArray, 'index', index)
    if(checkIndex == index){
      quantity = quantity + 1;
      quantityArray.innerHTML = quantity;
    }else {
      checkIndex = index;
      // quantity = quantityArray.innerHTML;
      quantity = Number(quantityArray.innerHTML);
      quantity = quantity + 1;
      quantityArray.innerHTML = quantity;
    }
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <h3>SHOPIFY COMPANY ID: {company_shopify_id}</h3>
      <h3>Cost Plus Pricing: {cost_plus}% above our cost</h3>
      <div>
        {productData ? 
          <div>
            <img src={product.featuredImage.url} className='product_image' alt='product'></img>
            <h2>Variants and pricing:</h2>
            <div id='variant_container'>
              {productCost.map((variant, index, e) => {
                return  <div key={index} className='add_to_order' >
                        <h3 className='inside_order_box'>
                            {variant.title}
                          </h3>
                          <p className='client_cost'>
                            Your Cost: { (+variant.product_cost * clientMarkup + +variant.product_cost).toFixed(2) }
                          </p>
                          <h3>
                            Quantity
                          </h3>
                          <p className='product_quantity'>0</p>
                          <p>
                            <button onClick={() => increment(index)} className='quantity'>Plus</button>
                            <button onClick={() => decrement(index)} className='quantity'>Minus</button>
                          </p>
                <button onClick={() => grabProductDetails()}>Add To Draft Order</button>
                </div>
              })}
              </div>
            <p>{product.description}</p>
          </div>
        : <h2>...loading</h2>}
      </div>
      {}
    </div>
  );
}

export default ProductPage;

// Draft order number D205