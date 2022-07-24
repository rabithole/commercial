import './App.css';
import React, { useEffect } from 'react';
// import DataAccess from './components/data_access';
import axios from 'axios';


function App() {
  useEffect(() => {
    // axios.get('https://10.0.2.2:5080/companies')
    axios
      .get('http://localhost:5080/companies')
      .then(function (response) {
        var info = response.data;
        console.log('Response Yes', response, info);
      })
      .catch(function (error) {
        console.log('Error happened here ---', error);
      })
    })


  return (
    <div className="App">
      
      <header className="App-header">
        <p>
          Something is gonna happen here... Or here!
        </p>
      </header>        
    </div>
  );
}

export default App;
