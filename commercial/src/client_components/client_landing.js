import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProductCollections from './product_collections';
import ClientVitals from './client_vitals';
import { CompanyContext } from '../context/company_shopify_id';
import ProductCollection from './product_collection';
import ProductPage from './product_page';
import ClientHeader from './client_header';
import Orders from './client_orders';
import SignInSignUp from './sign_in_sign_up';

function ClientLanding() {
  const [cost_plus, setCostPlus] = useState([]);
  const [companyInfo, setCompanyInfo] = useState();
  const [companyAddressField, setCompanyAddressField] = useState([]);

  // Shopify company id will be set from client sign in portal.
  let company_shopify_id = 'gid://shopify/Customer/6208973144100';

  useEffect(() => {
    // This will be part of client sign in.
    axios
      .post('http://localhost:5080/shopify_get_company', {id: company_shopify_id})
      .then((response) => {
          let companyInfo = response.data.data.customer;
          setCompanyInfo(companyInfo);
          if(companyInfo == undefined){
            console.log('company info undefined')
          }else{
            companyInfo.addresses.map((company) => {
              setCompanyAddressField(company)
            })
          }
      })
      .catch((error) => {
        console.log('Error', error)
      })

    axios
      .get(`http://localhost:5080/companies/company_by_shopify_id?key=${company_shopify_id}` )
      .then((response) => {
        setCostPlus(response.data.cost_plus);
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
      <ClientHeader
          companyAddressField={companyAddressField}
        />
      <nav>
        <Link to='client_vitals' className='collectionLinks'>Main Page</Link>
        <Link to='product_collections' className='collectionLinks'>Product Collections</Link>
        <Link to='orders' className='collectionLinks'>Orders</Link>
      </nav>

      <CompanyContext.Provider value={{ company_shopify_id, cost_plus, companyInfo, companyAddressField}}>
        <Routes>
          <Route path='product_collections/*' element={<ProductCollections />} />
          <Route path='/client_vitals' element={<ClientVitals />} />
          <Route path='/product_collection' element={<ProductCollection />} />
          <Route path='/product_page' element={<ProductPage />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/sign_in_sign_up' element={<SignInSignUp />} />
        </Routes>
      </CompanyContext.Provider>
    </div>
  );
}

export default ClientLanding;