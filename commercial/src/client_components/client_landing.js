// import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProductCollections from './product_collections';
import ClientVitals from './client_vitals';
import { CompanyContext } from '../context/company_shopify_id';
import ProductCollection from './product_collection';
import ProductPage from './product_page';

function ClientLanding() {
  //company_shopify_id, cost_plus, localId
  const [companyInfo, setCompanyInfo] = useState();
  const [companyAddressField, setCompanyAddressField] = useState([]);
  const [cost_plus, setCostPlus] = useState([]);
  // console.log('companyInfo', companyInfo)

  let company_shopify_id = 'gid://shopify/Customer/5973979234340';

  useEffect(() => {
      axios
          .post('http://localhost:5080/shopify_get_company', {id: company_shopify_id})
          .then((response) => {
            // console.log('response data admin', response.data.data.customer)
            let companyInfo = response.data.data.customer;
            setCompanyInfo(companyInfo);
            // let localCompanyId = {localCompanyId: localId};
            companyInfo.addresses.map((company) => {
              // setAddressData(company);
              // console.log(company)
              setCompanyAddressField(company)
            })
          })
          .catch((error) => {
            console.log('Error', error)
          })

          axios
              .get(`http://localhost:5080/companies/company_by_shopify_id?key=${company_shopify_id}` )
              .then((response) => {
                // console.log('response in client landing', response.data.cost_plus)
                setCostPlus(response.data.cost_plus)
              })
              .catch((err) => {
                console.log('error', err)
              })
  },[]);

  let companyData = false;
  if(companyAddressField.length == 0){
    companyData = false;
  } else {
    companyData = true;
  }

  return (
    <div>
      <nav>
        <Link 
          to='client_vitals' 
          className='collectionLinks'>
            Main Page
        </Link>
        <Link 
            to='product_collections'
            className='collectionLinks'
            state={company_shopify_id}>
              Product Collections
        </Link>
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