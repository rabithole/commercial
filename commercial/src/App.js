import { React, useReducer } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
// import axios from 'axios';
import CompaniesList from './dig_components/companies_list';
// import Company from './dig_components/company';
// import CreateCompany from './dig_components/create_company';
import Employees from './dig_components/employees';
import CreateEmployee from './dig_components/create_employee';
import Employee from './dig_components/employee';
import CompanyEdit from './dig_components/company_edit';
import DigLanding from './dig_components/dig_landing';
// import EmployeeEdit from './dig_components/employee_edit';
import ClientLanding from './client_components/client_landing';
import AllProducts from './client_components/all_products';
import SignInSignUp from './client_components/sign_in_sign_up';
// import ProductCollections from './client_components/product_collections';
// import ProductCollection from './client_components/product_collection';
// import ProductPage from './client_components/product_page';

function App() {
  // let { companyId } = useParams();
  // const [state, dispatch] = useReducer(AuthReducer, {
  //   user: JSON.parse(localStorage.getItem("user")) || INITIAL_STATE.user,
  //   loading: INITIAL_STATE.loading,
  //   error: INITIAL_STATE.error,
  // });
  

  return (
    // <AuthProvider
    //   authType={'localstorage'}
    //   authName={'_auth'}
    //   cookieDomain={window.location.hostname}
    //   cookieSecure={window.location.protocol === 'https:'}
    // >
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/*' element={<SignInSignUp />} />
          <Route path='/dig_landing/*' element={<DigLanding />} />
          <Route path='/client_landing/*' element={<ClientLanding />} />
          {/* <Route path='/companies_list' element={<CompaniesList />} /> */}
          {/* <Route path='/company:id' element={<Company />} /> */}
          {/* <Route path='create_company' element={<CreateCompany />} /> */}
          <Route path='/employees' element={<Employees />} />
          <Route path='employees/create_employee' element={<CreateEmployee />} />
          <Route path='employees/employee/:id' element={<Employee />} />
          <Route path='/company_edit' element={<CompanyEdit />} />
          {/* <Route path='/employee_edit' element={<EmployeeEdit />} /> */}
          <Route path='/all_products' element={<AllProducts />} />
          {/* <Route path='/product_collections' element={<ProductCollections />} /> */}
          {/* <Route path='/product_collection' element={<ProductCollection />} /> */}
          {/* <Route path='/product_page' element={<ProductPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
