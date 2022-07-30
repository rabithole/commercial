import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams } from 'react-router-dom';

function CreateCompany(props) {

	let { id } = useParams();

	// useEffect(() => {
	// 	axios
	// 		.post('http://localhost:5080/companies/single_company/' + id)
	// 		.then(function(response) {
	// 			console.log('Response', response.data)
	// 			setCompanyData(response.data)
	// 		})
	// 		.catch(error => {
	// 			console.log('Error, error, error', error)
	// 		})
	// },[]);

	return (
		<div className='single_company'>
			<nav>
				<Link to='/'>Back to List of Companies</Link>
			</nav>
		
			<h3>Your Company Information</h3>

			<form>
				<label>Company Name:</label><br/>
				<input type='text' id='name' />
				<br/>
				<label>Street:</label><br/>
				<input type='text' id='street' />
				<br/>
				<label>City:</label><br/>
				<input type='text' id='city' />
				<br/>
				<label>State:</label><br/>
				<input type='text' id='city' />
				<br/>
				<label>Zip Code:</label><br/>
				<input type='number' id='city' />
				<br/>
				<label>Notes:</label><br/>
				<textarea name='notes' id='notes'></textarea>
			</form>

			<h3>Primary Contact Information</h3>
			<form>
				<br/>
				<label>Email:</label><br/>
				<input type='email' id='email' />
				<br/>
				<label>Phone Number:</label><br/>
				<input type='text' id='phone' />
			</form>
		</div>
	)
}

export default CreateCompany;