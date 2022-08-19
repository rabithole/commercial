import './App.css';
import React, { useEffect} from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import axios from 'axios';


function App() {
  // let { companyId } = useParams();

  return (
    <div>
      <h1>Client Landing Page with list of client MVP's</h1>
      <p>Company Name</p>
      <p>Product Pages</P>
      <p>Balance Owed</p>
      <p>List of orders</p>
      <p>Add to order button for each product</p>
      <p>Orders Page</p>
    </div>
  );
}

export default App;
