import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInSignUp() {
  const [credentials, setCredentials] = useState({});
  const [whoIsSigningIn, setWhoIsSignedIn] = useState(false);
  const [employeeOrClient, setemployeeOrClient] = useState('');
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
    setemployeeOrClient(cliemp);

    if(cliemp == 'employee'){
      employeeClient = 'employee';
      // if(credentials){
      //   navigate('/dig_landing/companies_list')
      // }else{
      //   console.log('no credentials')
      // }
    }
    if(cliemp == 'client'){
      employeeClient = 'client';
      // if(credentials){
      //   navigate('/client_landing/client_vitals')
      // }else{
      //   console.log('no credentials')
      // }
    }
    console.log('Client employee function', employeeClient)
  }

  return (
    <div className='sign_in_sign_up'>
        {employeeOrClient == 'client' ? <h1>Cultivator</h1> : <h1>Employee</h1>}
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