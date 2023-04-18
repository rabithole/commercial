import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInSignUp() {
  const [credentials, setCredentials] = useState({});
  const [whoIsSigningIn, setWhoIsSignedIn] = useState(false);
  console.log('creds---', credentials)

  const navigate = useNavigate();

  useEffect(() => {
    
  },[]);

  const onChange = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    setCredentials({
        ...credentials,
            username
        ,
            password
    })
  }

  let employeeClient = '';

  function ClientEmployee(cliemp) {
    setWhoIsSignedIn(true);

    if(cliemp == 'employee'){
      employeeClient = 'employee';
      // navigate('/dig_landing/companies_list')
    }
    if(cliemp == 'client'){
      employeeClient = 'client';
      // navigate('/client_landing/client_vitals')
    }
    console.log('Client employee function', employeeClient)
  }

  return (
    <div className='sign_in_sign_up'>
        <h1>Client or Employee</h1>
        {whoIsSigningIn == false ? 
          <section className='client_employee'>
            <button onClick={() => ClientEmployee('employee')}>DIG Employees</button>
            <button onClick={() => ClientEmployee("client")}>DIG Clients</button>
          </section>
        : <form>
        <label>Username: </label>
        <input 
            type='text' 
            id="username" 
            name='username'
            onChange={onChange}
            />
        <br/>

        <label>Password: </label>
        <input 
            type='text' 
            id='password' 
            name='password'
            onChange={onChange}
            />
    </form>}
    </div>
  );
}

export default SignInSignUp;