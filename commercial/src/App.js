import './App.css';
import React, { useEffect} from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import axios from 'axios';
import CompanyList from './components/companies_list';
import SingleCompany from './components/company';
import CreateCompany from './components/create_company';
import Employees from './components/employees';
import CreateEmployee from './components/create_employee';
import Employee from './components/employee';
import CompanyEdit from './components/company_edit';
import EmployeeEdit from './components/employee_edit';

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
          <Route path='/' exact element={<CompanyList />} />
          <Route path='/companies/company:id' element={<SingleCompany />} />
          <Route path='create_company' element={<CreateCompany />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='employees/create_employee' element={<CreateEmployee />} />
          <Route path='employees/employee/:id' element={<Employee />} />
          <Route path='/company_edit' element={<CompanyEdit />} />
          <Route path='/employee_edit' element={<EmployeeEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
