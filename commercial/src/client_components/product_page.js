import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id.js';
 
function ProductPage(props) {
  const [product, setProduct] = useState([]);
  const [productCost, setProductCost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lineItems, setLineItems] = useState([]);
  // setLineItems(window.localStorage.getItem('draftOrder'))
  console.log('line items---', lineItems)
  
  const { company_shopify_id, cost_plus } = useContext(CompanyContext);
  let clientMarkup = cost_plus / 100;

  useEffect(() => {
    setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')))
    
  },[])

  if(lineItems){
    let quantity = document.querySelectorAll('.add_to_order')
    console.log('quantity---', quantity)
  }

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
          let variantId = cost.node.id;
          axios
            .get('http://localhost:5080/costs_by_sku/' + requestSku)
            .then(function(response) {
              let product_cost = response.data.unit_cost;
              array.push({sku, title, product_cost, variantId})
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

  let orderObjectArray = [];

  function orderObjectHandling(productList){    
    if(orderObjectArray.length == 0){
      orderObjectArray.push(productList)
      console.log('array---', orderObjectArray)
      window.localStorage.setItem('draftOrder', JSON.stringify(orderObjectArray));
    }else{
      for(let i = 0; i < orderObjectArray.length; i++){
        console.log('order object array looping', orderObjectArray[i].sku)
        if(orderObjectArray[i].sku == productList.sku){
          orderObjectArray[i] = productList
          console.log('array end---', orderObjectArray)
          window.localStorage.setItem('draftOrder', JSON.stringify(orderObjectArray));
          return
        }else if(i == orderObjectArray.length-1){
          orderObjectArray.push(productList)
          console.log('array---', orderObjectArray)
          window.localStorage.setItem('draftOrder', JSON.stringify(orderObjectArray));
        }
      }
    }
  }

  let productData = false;
  if(loading){
    productData = false;
  }else{
    productData = true;
  }

  function grabProductDetails(index, variant){
    // console.log('variant----', variant)
    let quantityArray = document.querySelectorAll('.add_to_order')[index];
    let quantity = quantityArray.childNodes[3].innerHTML;
    let variantCost = Number((+variant.product_cost * clientMarkup + +variant.product_cost).toFixed(2));
    let variantTotal = (variantCost * quantity).toFixed(2);
    let graphQlObject = {
      title: variant.title,
      originalUnitPrice: variantCost,
      sku: variant.sku,
      variantId: variant.variantId,
      quantity: Number(quantity),
      requiresShipping: true
    }

    orderObjectHandling(graphQlObject);
  }

  function createShopifyDraftOrder(){
    let localStorage = JSON.parse(window.localStorage.getItem('draftOrder'));
    console.log('Local Storage', localStorage)

    axios.post('http://localhost:5080/create_draft_order', localStorage)
      .then((response) => {
        console.log('Response', response.config.data)
        console.log('response', response)
      })
  }

  // let quantity = 0;
  // let checkIndex = 0;
  // function decrement(index){
  //   let quantityArray = document.querySelectorAll('.add_to_order')[index].childNodes[3];
  //   console.log('Quantity array', quantityArray, 'index', index)
  //   if(checkIndex == index){
  //     quantity = quantity - 1;
  //     if(quantity < 0){
  //       quantity = 0;
  //     }
  //     quantityArray.innerHTML = quantity;
  //   }else {
  //     checkIndex = index;
  //     quantity = Number(quantityArray.innerHTML);
  //     quantity = quantity - 1;
  //     if(quantity < 0){
  //       quantity = 0;
  //     } 
  //     quantityArray.innerHTML = quantity;
  //   }
  // }

  // function increment(index){
  //   let quantityArray = document.querySelectorAll('.add_to_order')[index].childNodes[3];
  //   if(checkIndex == index){
  //     quantity = quantity + 1;
  //     quantityArray.innerHTML = quantity;
  //   }else {
  //     checkIndex = index;
  //     quantity = Number(quantityArray.innerHTML);
  //     quantity = quantity + 1;
  //     quantityArray.innerHTML = quantity;
  //   }
  // }

  return (
    <div>
      <h1>{product.title}</h1>
      <h3>SHOPIFY COMPANY ID: {company_shopify_id}</h3>
      <h3>Cost Plus Pricing: {cost_plus}% above our cost</h3>
      <div>
        {productData ? 
          <div>
            <div id='productDraftOrder'>
              <section>
                <img src={product.featuredImage.url} className='product_image' alt='product'></img>
                <h2>Variant pricing and quantity</h2>
              </section>
              <section>
                <h3>Current Draft Order</h3>
              </section>
            </div>
            <div id='variant_container'>
            <button onClick={() => createShopifyDraftOrder()} id='draftOrderButton'>Create Draft Order</button>
              {productCost.map((variant, index, e) => {
                return  <div key={index} className='add_to_order' >
                          <h3 className='inside_order_box'>
                            {variant.title} ----- Sku: { variant.sku }
                          </h3>
                          <p className='client_cost'>
                            Cost Per Unit: { (+variant.product_cost * clientMarkup + +variant.product_cost).toFixed(2) }
                          </p>
                          <h3>
                            Quantity
                          </h3>
                          <p className='product_quantity' contentEditable='true'  suppressContentEditableWarning={true}>0</p>
                          {/* <p>
                            <button onClick={() => increment(index)} className='quantity'>Add</button>
                            <button onClick={() => decrement(index)} className='quantity'>Remove</button>
                          </p> */}
                          <button onClick={() => grabProductDetails(index, variant)}>Add To Draft Order</button>
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