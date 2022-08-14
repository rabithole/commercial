import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

function CompanyEdit(props) {
	console.log('Create Company Refresh')
	
	const location = useLocation();
	const history = useNavigate();
	const companyData = location.state;

	const [newCompany, setCompanyData] = useState({
		name: '',
		cost_plus: '',
		street: '',
		city: '',
		state: '',
		zip: ''
	})

	useEffect(() => {
		setCompanyData(companyData)		
	},[])

	const handleSubmit = event => {
		event.preventDefault();
		axios
			.put('http://localhost:5080/companies/' + companyData.id, newCompany)
			.then(function(res) {
				console.log('Response', res.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
				return
			})
	}

	const handleChange = (event) => {
		setCompanyData({
			...newCompany,
			[event.target.name]: event.target.value,
		})
	}
	

	return (
		<div className='company'>
			<h1>Company Edit</h1>

			<nav>
				<button onClick={ () => history(-1) }>Back to Company</button>
			</nav>
		
			<h2>Update Company Information</h2>

			<form onSubmit={handleSubmit}> 
				<label>Company Name:</label><br/>
				<input 
					type='text' 
					id='name'
					name='name'
					onChange={handleChange} 
					autoFocus
					defaultValue={companyData.name}
				/>
				<br/>

				<label>Percentage Above Cost:</label><br/>
				<input 
					type='text' 
					id='cost_plus'
					name='cost_plus'
					onChange={handleChange} 
					defaultValue={companyData.cost_plus}
				/>
				<br/>

				<label>Street:</label><br/>
				<input 
					type='text' 
					id='street'
					name='street'
					onChange={handleChange} 
					defaultValue={companyData.street}
				/>
				<br/>

				<label>City:</label><br/>
				<input 
					type='text' 
					id='city'
					name='city'
					onChange={handleChange} 
					defaultValue={companyData.city}
				/>
				<br/>

				<label>State:</label><br/>
				<input 
					type='text' 
					id='state' 
					name='state'
					onChange={handleChange} 
					defaultValue={companyData.state}
				/>
				<br/>

				<label>Zip Code:</label><br/>
				<input 	
					type='text'
					maxLength='5' 
					id='zip'
					name='zip' 
					onChange={handleChange} 
					defaultValue={companyData.zip}
				/>
				<br/>

				<label>Notes:</label><br/>
				<textarea 
					name='notes' 
					id='notes'
					onChange={handleChange} 
				>

				</textarea>

				<button>Update Company</button>
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

export default CompanyEdit;