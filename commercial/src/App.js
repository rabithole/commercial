import './App.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CompanyList from './components/companies_list';

function App() {

  return (
    <div className="App">
      
      <header className="App-header">
        <p>
          <Link to='/single_company'>Company</Link>
        </p>
      </header>        

      <CompanyList />

    </div>
  );
}

export default App;
