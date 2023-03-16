import React, { useState, useEffect } from 'react';
import { } from 'react-router-dom';
// import axios from 'axios';

function Orders() {
  const [lineItems, setLineItems] = useState([]);
  const [productName, setProductName] = useState([]);
  const [orderObjectArray, setOrderOjectArray] = useState([]);
  console.log('order object array---', orderObjectArray)

  useEffect(() => {
    if(window.localStorage.getItem('draftOrder') == null){
      return
    }else {
      setLineItems(JSON.parse(window.localStorage.getItem('draftOrder')));
      setOrderOjectArray(JSON.parse(window.localStorage.getItem('draftOrder')));
    }
  },[])

  function clearDraftOrder(){
    window.localStorage.clear();
    setLineItems([]);
    setOrderOjectArray([]);
  }

  return (
      <div>
        <h1>Draft Order</h1>
        <div className='draftOrderBox'>
          {orderObjectArray.map((variant, index) => {
            return  <div className='currentOrder' key={index}>
                      <p>Name:{variant.name}</p>
                      <p>Title: {variant.title}</p>
                      <p>Sku: {variant.sku}</p>
                      <p>Cost Per Unit: {variant.originalUnitPrice}</p>
                      <p>Quantity: {variant.quantity}</p>
                    </div>
          })}
          <button id='clearDraftOrder' onClick={() => clearDraftOrder()}>Clear Draft Order</button>
        </div>
      </div>
  );
}

export default Orders;
