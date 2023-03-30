import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id.js';

const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
 
function ProductPage(props) {
  const [product, setProduct] = useState([]);
  const [productCost, setProductCost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lineItems, setLineItems] = useState([]);
  const [productName, setProductName] = useState([]);
  const [orderObjectArray, setOrderOjectArray] = useState([]);
  const [total, setTotal] = useState(0);
  console.log('Total---', total)
  // console.log('order object array---', orderObjectArray)

  const { company_shopify_id, cost_plus } = useContext(CompanyContext);
  let clientMarkup = cost_plus / 100;

  useEffect(() => {
      if(window.localStorage.getItem('draftOrder') == null){
        return
      }else {
        setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')));
        setOrderOjectArray(JSON.parse(window.localStorage.getItem('draftOrder')));
      }
  },[])

  const product_id = useLocation().state;
  useEffect(() => {
    axios
      .post('http://localhost:5080/shopify_get_product', {id: product_id})
      .then((response) => {
        let product = response.data.data.product;
        let productName = product.title;
        // console.log('product name---', product.title)
        setProductName(productName);
        setProduct(product) // Product information returned from API with product info and variants.

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

  function orderObjectHandling(productList){    
    if(orderObjectArray.length == 0){
      orderObjectArray.push(productList)
      console.log('array---', orderObjectArray)
      window.localStorage.setItem('draftOrder', JSON.stringify(orderObjectArray));
      setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')));
      setOrderOjectArray(JSON.parse(window.localStorage.getItem('draftOrder')));
    }else{
      for(let i = 0; i < orderObjectArray.length; i++){
        console.log('order object array looping', orderObjectArray[i].sku)
        if(orderObjectArray[i].sku == productList.sku){
          orderObjectArray[i] = productList
          console.log('array end---', orderObjectArray)
          window.localStorage.setItem('draftOrder', JSON.stringify(orderObjectArray));
          setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')));
          setOrderOjectArray(JSON.parse(window.localStorage.getItem('draftOrder')));
          return
        }else if(i == orderObjectArray.length-1){
          orderObjectArray.push(productList)
          console.log('array---', orderObjectArray)
          window.localStorage.setItem('draftOrder', JSON.stringify(orderObjectArray));
          setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')));
          setOrderOjectArray(JSON.parse(window.localStorage.getItem('draftOrder')));
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

  function addToDraftOrder(index, variant){
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
      requiresShipping: true,
      name: productName
    }

    orderObjectHandling(graphQlObject);
  }

  function clearDraftOrder(){
    window.localStorage.clear();
    setLineItems([]);
    setOrderOjectArray([]);
  }

  function createShopifyDraftOrder(){
    let localStorage = JSON.parse(window.localStorage.getItem('draftOrder'));
    for(let i = 0; i < localStorage.length; i++){
      delete localStorage[i].name;
    }
    console.log('Local Storage', localStorage)

    axios.post('http://localhost:5080/create_draft_order', localStorage)
      .then((response) => {
        console.log('Response', response.config.data)
        console.log('response', response)
      })
    clearDraftOrder();
  }

  let orderTotalArray = [];
  let sum = 0;
  
  // Totaling current draft order
  useEffect(() => {
  let draftOrderTotal = document.querySelectorAll('.draftOrderTotal');
  for(let i = 0; i < draftOrderTotal.length; i++){
    if(draftOrderTotal[i] == undefined){
      console.log('draft order total undefinded')
    }else{
      // let ordertotal = Number(draftOrderTotal[i].innerHTML.substring(0,1) + draftOrderTotal[i].innerHTML.substring(1,draftOrderTotal[i].length));
      let ordertotal = Number(draftOrderTotal[i].innerHTML.slice(1));
      orderTotalArray.push(ordertotal);
      console.log('order total array inside function---', orderTotalArray)
      for(const value of orderTotalArray){
        sum += value;
      }
    }
  }
  setTotal(sum);
})

function removeLineItem(index){
  console.log('remove item', index)
  console.log('Order object array---', orderObjectArray)

    for(let i = 0; i < orderObjectArray.length; i++){
      if(index == i){
        orderObjectArray.splice(i,1)
        // setOrderOjectArray(orderObjectArray)
        window.localStorage.setItem('draftOrder', JSON.stringify(orderObjectArray));
        setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')));
        setOrderOjectArray(JSON.parse(window.localStorage.getItem('draftOrder')));
        console.log('deleted---', orderObjectArray)
      }
    }
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <h3>SHOPIFY COMPANY ID: {company_shopify_id}</h3>
      <h3>Cost Plus Pricing: {cost_plus}% above our cost</h3>
      <h2 id='currentDraftOrderH2'>Current Draft Order Total: {currencyFormat.format(total)}</h2>
      <div>
        {productData ? 
          <div>
            <div id='productDraftOrder'>
              <section>
                <img src={product.featuredImage.url} className='product_image' alt='product'></img>
                <h2>Variant pricing and quantity</h2>
              </section>
              <section className='draftOrderBox'>
                {lineItems.map((item, index) => {
                  return  <div className='currentOrder' key={index}>
                            <p>Name: {item.name}</p>
                            <p>Title: {item.title}</p>
                            <h4>Cost Per Unit: {currencyFormat.format(item.originalUnitPrice)}</h4>
                            <p>Sku: {item.sku}</p>
                            <p>Quantity: {item.quantity}</p>
                            <h4>Total</h4>
                            <h4 className='draftOrderTotal'>${item.quantity * item.originalUnitPrice}</h4>
                            <button id='removeItemButton' onClick={() => removeLineItem(index)}>Remove</button>
                            <button onClick={() => createShopifyDraftOrder()} id='draftOrderButton'>Create Draft Order</button>
                          </div>
                })}
                <button id='clearDraftOrder' onClick={() => clearDraftOrder()}>Clear Draft Order</button>
              </section>
            </div>
            <div id='variant_container'>
              {productCost.map((variant, index, e) => {
                return  <div key={index} className='add_to_order' >
                          <h3 className='inside_order_box'>
                            {variant.title} ----- Sku: { variant.sku }
                          </h3>
                          <p className='client_cost'>
                            Cost Per Unit: { (+variant.product_cost * clientMarkup + +variant.product_cost).toFixed(2) }
                          </p>
                          <h3>
                            Enter Quantity
                          </h3>
                          <p className='product_quantity' contentEditable='true'  suppressContentEditableWarning={true}></p>
                          {/* <p>
                            <button onClick={() => increment(index)} className='quantity'>Add</button>
                            <button onClick={() => decrement(index)} className='quantity'>Remove</button>
                          </p> */}
                          <button onClick={() => addToDraftOrder(index, variant)}>Add To Draft Order</button>
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

// Increment and decrement button logic. May or may not use

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