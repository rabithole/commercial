import React, { useEffect, useState, useContext } from 'react';
import {  } from 'react-router-dom';
import axios from 'axios';
import { CompanyContext } from '../context/company_shopify_id';

function SignInSignUp() {
  const { company_shopify_id, companyInfo, companyAddressField } = useContext(CompanyContext);
  const [credentials, setCredentials] = useState({});
  console.log('passowrd---', credentials)

  useEffect(() => {
    
  },[]);

  const onChange = (event) => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    setCredentials({
        ...credentials,
            username
        ,
            password
    })
  }

  return (
    <div className='sign_in_sign_up'>
        <h1>Sign In Sign Up Page Beginning</h1>
        <form>
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
        </form>
    </div>
  );
}

export default SignInSignUp;