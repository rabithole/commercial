import React, { useState, useEffect } from 'react';
import { } from 'react-router-dom';
import axios from 'axios';

const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

function Orders() {
  const [lineItems, setLineItems] = useState([]);
  const [orderObjectArray, setOrderOjectArray] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(window.localStorage.getItem('draftOrder') == null){
      return
    }else {
      setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')));
      setOrderOjectArray(JSON.parse(window.localStorage.getItem('draftOrder')));
    }
  },[])

  let orderTotalArray = [];
  let sum = 0;

  // Totals current draft order
  useEffect(() => {
  let draftOrderTotal = document.querySelectorAll('.draftOrderTotal');
  for(let i = 0; i < draftOrderTotal.length; i++){
    if(draftOrderTotal[i] == undefined){
      console.log('draft order total undefinded')
    }else{
      let ordertotal = Number(draftOrderTotal[i].innerHTML.slice(1));
      orderTotalArray.push(ordertotal);
      for(const value of orderTotalArray){
        sum += value;
      }
    }
  }
  setTotal(sum);
})

  function clearDraftOrder(){
    window.localStorage.clear();
    setLineItems([]);
    setOrderOjectArray([]);
  }

  function removeLineItem(index){
    console.log('remove item', index)
    console.log('Order object array---', orderObjectArray)
  
      for(let i = 0; i < orderObjectArray.length; i++){
        if(index == i){
          orderObjectArray.splice(i,1)
          window.localStorage.setItem('draftOrder', JSON.stringify(orderObjectArray));
          setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')));
          setOrderOjectArray(JSON.parse(window.localStorage.getItem('draftOrder')));
          console.log('deleted---', orderObjectArray)
        }
      }
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

  return (
      <div>
        <h1>Current Draft Order Total: {currencyFormat.format(total)}</h1>
        <div className='draftOrderBox'>
          {orderObjectArray.map((variant, index) => {
            return  <div className='currentOrder' key={index}>
                      <p>Name: {variant.name}</p>
                      <p>Title: {variant.title}</p>
                      <p>Sku: {variant.sku}</p>
                      <h4>Cost Per Unit: ${currencyFormat.format(variant.originalUnitPrice)}</h4>
                      <p>Quantity: {variant.quantity}</p>
                      <h4>Total</h4>
                      <h4 className='draftOrderTotal'>${variant.quantity * variant.originalUnitPrice}</h4>
                      <button id='removeItemButton' onClick={() => removeLineItem(index)}>Remove</button>
                    </div>
          })}
          <button id='clearDraftOrder' onClick={() => clearDraftOrder()}>Clear Draft Order</button>
          <button onClick={() => createShopifyDraftOrder()} id='draftOrderButton'>Create Draft Order</button>
        </div>
      </div>
  );
}

export default Orders;
