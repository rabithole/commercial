import './App.css';
import React, { } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import axios from 'axios';
import CompanyList from './dig_components/companies_list';
import Company from './dig_components/company';
import CreateCompany from './dig_components/create_company';
import Employees from './dig_components/employees';
import CreateEmployee from './dig_components/create_employee';
import Employee from './dig_components/employee';
import CompanyEdit from './dig_components/company_edit';
// import EmployeeEdit from './dig_components/employee_edit';
import ClientLanding from './client_components/client_landing';
import AllProducts from './client_components/all_products';
// import ProductCollections from './client_components/product_collections';
// import ProductCollection from './client_components/product_collection';
// import ProductPage from './client_components/product_page';

function App() {
  // let { companyId } = useParams();

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>
            DIG Dashboard
          </h1>
        </header>    
        
        <Routes>
          <Route path='/' element={<CompanyList />} />
          <Route path='/companies/company:id' element={<Company />} />
          <Route path='create_company' element={<CreateCompany />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='employees/create_employee' element={<CreateEmployee />} />
          <Route path='employees/employee/:id' element={<Employee />} />
          <Route path='/company_edit' element={<CompanyEdit />} />
          {/* <Route path='/employee_edit' element={<EmployeeEdit />} /> */}
          <Route path='/client_landing/*' element={<ClientLanding />} />
          <Route path='/all_products' element={<AllProducts />} />
          {/* <Route path='/product_collections' element={<ProductCollections />} /> */}
          {/* <Route path='/product_collection' element={<ProductCollection />} /> */}
          {/* <Route path='/product_page' element={<ProductPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
