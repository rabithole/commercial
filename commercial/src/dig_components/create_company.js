import React, { useState, useCallback } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useNavigate } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';

function CreateCompany(props) {
	const dashboard = useNavigate();
	const digDashboard = () => {
		setTimeout(() => {
			dashboard("/dig_landing/companies_list")
		}, 1000)
	}

	const [newCompany, setCompanyData] = useState({});
	const [primaryContact, setPrimaryContact] = useState({});
	const [company, setNewCompany] = useState();
	const [credentials, setCredentials] = useState({});

	console.log('new company----', newCompany)

	function createShopifyCompany(event){
		event.preventDefault();
	    axios.post('http://localhost:5080/shopify_create_company', company)
	      .then((response) => {
	      	let companyId = response.data.id;
	      	updateLocalCompanyData({
	      		shopify_id: companyId,
	      		company_name: newCompany.company,
	      		first_name: primaryContact.first_name,
	      		last_name: primaryContact.last_name,
	      		cost_plus: newCompany.cost_plus, 
	      		note: newCompany.note, 
	      		phone: primaryContact.phone,
	      		email: primaryContact.email,
				username: credentials.username,
				password: credentials.password
	      	});
	      	digDashboard();
	      })
	  	}

	const companyData = useCallback(() => {
		setNewCompany({
			...company,
				input: {
					...primaryContact
				},
				addresses: {
					...newCompany
				},
				credentials: {
					...credentials
				}
			}
		)
	},[company, newCompany, primaryContact]);

	function updateLocalCompanyData(newCompanyData){
		axios.post('http://localhost:5080/credentials/register', {
			shopify_id: newCompanyData.shopify_id,
			username: newCompanyData.username,
			password: newCompanyData.password
		})
			.then((res) => {
				console.log('credentials end point---', res.data)
			})
			.catch((error) => {
				console.log('error', error)
			})

		axios.post('http://localhost:5080/companies', {
			shopify_id: newCompanyData.shopify_id,
			company_name: newCompanyData.company_name,
			first_name: newCompanyData.first_name,
			last_name: newCompanyData.last_name,
			cost_plus: newCompanyData.cost_plus,
			note: newCompanyData.note,
			phone: newCompanyData.phone,
			email: newCompanyData.email
		})
        	.then((res) => {
        		console.log('pass to local company state in create_company.js', res.data)
        	})
        	.catch(error => {
        		console.log('error in getCompanyData in create_company.js', error)
        	})
	}

	function runRegister(){
		axios.post('http://localhost:5080/credentials/register', {
			username: 'bobo',
			password: 'hashed'
		})
			.then((res) => {
				console.log('credentials end point---', res.data)
			})
			.catch((error) => {
				console.log('error', error)
			})
	}

	const companyChange = (event) => {
		setCompanyData({
			...newCompany,
			[event.target.name]: event.target.value,
		})
		companyData();
	}

	const contactChange = event => {
		setPrimaryContact({
			...primaryContact,
			[event.target.name]: event.target.value,
		})
		companyData();
	}
	
	const credentialsChange = event => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		})
		companyData();
	}
	return (
		<div className='company'>
			<nav>
				<Link to='/dig_landing/companies_list'>Back to List of Companies</Link>
				<button onClick={runRegister}>Testing Creds</button>
			</nav>

			<h1>Create A New Company</h1>
		
			<h2>Input Company Information</h2>

			<form onSubmit={createShopifyCompany}> 
				<div>
					<label>Company Name:</label><br/>
					<input 
						type='text' 
						id='name'
						name='company'
						onChange={companyChange}
						autoFocus
					/>
				</div>

				<div>
					<label>Percentage Above Cost:</label><br/>
					<input 
						type='number' 
						id='cost_plus'
						name='cost_plus'
						onChange={companyChange} 
					/>
				</div>

				<div>
					<h2>Primary Contact</h2>
					<label>First Name</label>
					<input
						type='text'
						id='first_name'
						name='first_name'
						onChange={contactChange}
					/>
				</div>

				<div>
					<label>Last Name</label>
					<input
						type='text'
						id='last_name'
						name='last_name'
						onChange={contactChange}
					/>
				</div>

				<div>
					<label>Phone:</label><br/>
					 <PatternFormat 
						format='(###)-###-####'
						mask="_"
						type='text' 
						id='phone'
						name='phone'
						onChange={contactChange} 
				 	/>
				</div>

				<div>
					<label>Email:</label><br/>
					<input 
						type='text' 
						id='email'
						name='email'
						onChange={contactChange} 
					/>
				</div>

				<div>
					<h2>Company Address</h2>
					<label>Street:</label><br/>
					<input 
						type='text' 
						id='address1'
						name='address1'
						onChange={companyChange} 
					/>
				</div>

				<div>
					<label>Apartment or Suite:</label><br/>
					<input 
						type='text' 
						id='address2'
						name='address2'
						onChange={companyChange} 
					/>
				</div>

				<div>
					<label>City:</label><br/>
					<input 
						type='text' 
						id='city'
						name='city'
						onChange={companyChange} 
					/>
				</div>

				<div>
					<label>State / Province:</label><br/>
					<input 
						type='text' 
						id='state' 
						name='state'
						onChange={companyChange} 
					/>
				</div>

				<div>
					<label>Zip Code:</label><br/>
					<input 	
						type='text'
						maxLength='5' 
						id='zip'
						name='zip' 
						onChange={companyChange} 
					/>
				</div>

				<div>
					<label>Tracking Tags: The tag 'commercial' must be one of the tracking tags.</label>
					<input
						type='text'
						id='tags'
						name='tags'
						onChange={contactChange}
					/>
				</div>

				<div>
					<label>Notes:</label><br/>
					<textarea 
						name='note' 
						id='note'
						onChange={companyChange} 
					>
					</textarea>
				</div>

				<h2>Username & Password</h2>
				<div>
					<label>Username:</label>
					<input
						type='text'
						name='username'
						id='username'
						onChange={credentialsChange}
					>
					</input>
				</div>

				<div>
					<label>Password</label>
					<input
						type='text'
						name='password'
						id='firstPassword'
						onChange={credentialsChange}
					>
					</input>
				</div>

				<button>Create Company</button>
			</form>

			<hr/>
		</div>
	)
}

export default CreateCompany;