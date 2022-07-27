import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import CompanyList from './components/companies_list';

function App() {

  return (
    <div className="App">
      
      <header className="App-header">
        <p>
          Header to come...
        </p>
      </header>        

      <CompanyList />

    </div>
  );
}

export default App;
