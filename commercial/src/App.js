import './App.css';
import React, { useEffect} from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import axios from 'axios';
import CompanyList from './components/companies_list';
import SingleCompany from './components/single_company';
import CreateCompany from './components/create_company';

function App() {
  // let { companyId } = useParams();

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>
            The Header Man
          </h1>
        </header>    
        
        <Routes>
          <Route path='/' exact element={<CompanyList />} />
          <Route path='companies/single_company:id' element={<SingleCompany />} />
          <Route path='companies/create_company' element={<CreateCompany />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
