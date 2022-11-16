import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProductCollections from './product_collections';
import ClientVitals from './client_vitals';
import { CompanyContext } from '../context/company_shopify_id';
import ProductCollection from './product_collection';
import ProductPage from './product_page';
import ClientHeader from './client_header';

function ClientLanding() {
  const [cost_plus, setCostPlus] = useState([]);

  // Shopify company id will be set from client sign in portal.
  let company_shopify_id = 'gid://shopify/Customer/5973979234340';

  useEffect(() => {
    // This will be part of client sign in.
      // axios
      //     .post('http://localhost:5080/shopify_get_company', {id: company_shopify_id})
      //     .then((response) => {
      //         let companyInfo = response.data.data.customer;
      //         companyInfo.addresses.map((company) => {
      //       })
      //     })
      //     .catch((error) => {
      //       console.log('Error', error)
      //     })

          axios
              .get(`http://localhost:5080/companies/company_by_shopify_id?key=${company_shopify_id}` )
              .then((response) => {
                setCostPlus(response.data.cost_plus)
              })
              .catch((err) => {
                console.log('error', err)
              })
  },[company_shopify_id]);

  // For conditional rendering in JSX. Will come into to play later in the project for client sign in.
  // let companyData = false;
  // if(companyAddressField.length === 0){
  //   companyData = false;
  // } else {
  //   companyData = true;
  // }

  return (
    <div>
      <ClientHeader />
      <nav>
        <Link to='client_vitals' className='collectionLinks'>Main Page</Link>
        <Link to='product_collections' className='collectionLinks'>Product Collections</Link>
        <Link to='/' className='collectionLinks'>Orders</Link>
      </nav>

      <CompanyContext.Provider value={{ company_shopify_id, cost_plus}}>
        <Routes>
          <Route path='product_collections/*' element={<ProductCollections />} />
          <Route path='client_vitals' element={<ClientVitals />} />
          <Route path='/product_collection' element={<ProductCollection />} />
          <Route path='/product_page' element={<ProductPage />} />
        </Routes>
      </CompanyContext.Provider>
    </div>
  );
}

export default ClientLanding;