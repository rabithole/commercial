import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import CompanyList from './components/companies_list';

function App() {

  return (
    <div className="App">
      <CompanyList />
      
      <header className="App-header">
        <p>
          Something is gonna happen here... Or here!
        </p>
      </header>        
    </div>
  );
}

export default App;
