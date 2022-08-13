import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

function CreateCompany(props) {
	console.log('Create Company Refresh')
	let history = useNavigate();

	const [newCompany, setCompanyData] = useState({
		name: '',
		cost_plus: '',
		street: '',
		city: '',
		state: '',
		zip: ''
	})

	// console.log('New Company', newCompany)

	const handleSubmit = event => {
		event.preventDefault();
		axios
			.post('http://localhost:5080/companies', newCompany)
			.then(function(res) {
				console.log('Response', res.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})

		setTimeout(() => {
			window.location.reload(true)
		}, '500');
	}

	const handleChange = (event) => {
		setCompanyData({
			...newCompany,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<div className='company'>
			<nav>
				<Link to='/'>Back to List of Companies</Link>
			</nav>
		
			<h2>Input Your Company Information</h2>

			<form onSubmit={handleSubmit}> 
				<label>Company Name:</label><br/>
				<input 
					type='text' 
					id='name'
					name='name'
					onChange={handleChange} 
					autoFocus
				/>
				<br/>

				<label>Percentage Above Cost:</label><br/>
				<input 
					type='text' 
					id='cost_plus'
					name='cost_plus'
					onChange={handleChange} 
				/>
				<br/>

				<label>Street:</label><br/>
				<input 
					type='text' 
					id='street'
					name='street'
					onChange={handleChange} 
				/>
				<br/>

				<label>City:</label><br/>
				<input 
					type='text' 
					id='city'
					name='city'
					onChange={handleChange} 
				/>
				<br/>

				<label>State:</label><br/>
				<input 
					type='text' 
					id='state' 
					name='state'
					onChange={handleChange} 
				/>
				<br/>

				<label>Zip Code:</label><br/>
				<input 	
					type='text'
					maxLength='5' 
					id='zip'
					name='zip' 
					onChange={handleChange} 
				/>
				<br/>

				<label>Notes:</label><br/>
				<textarea 
					name='notes' 
					id='notes'
					onChange={handleChange} 
				>

				</textarea>

				<button>Create Company</button>
			</form>

			<hr/>

			<h2>Primary Contact Information</h2>
			<form>
				<br/>
				<label>Email:</label><br/>
				<input 
					type='email' 
					id='email' 
					onChange={handleChange} 
				/>
				<br/>

				<label>Phone Number:</label><br/>
				<input 
					type='text' 
					id='phone'
					onChange={handleChange}  
				/>

				<button>Submit</button>
			</form>
		</div>
	)
}

export default CreateCompany;