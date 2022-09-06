import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

function CreateCompany(props) {
	// console.log('Create Company Refresh')
	let history = useNavigate();

	// const [newCompany, setCompanyData] = useState({
	// 	name: '',
	// 	cost_plus: '',
	// 	street: '',
	// 	city: '',
	// 	state: '',
	// 	zip: ''
	// })

	const [newCompany, setCompanyData] = useState({
		input: {
			first_name: '',
			last_name: '', 
			email: '',
			notes: ''
			},
		addresses: {
			address1: '',
			address2: '',
			city: '',
			zip: '',
			country: '',
			phone: '',
			company: ''
		}
	})
	console.log('New Company GraphQL', newCompany);


	function callAdminApi(){
	    axios
	      .get('http://localhost:5080/admin_api')
	      .then(function(response) {
	        console.log('Response admin api', response.data.data)
	      })
	      .catch(error => {
	        console.log('Error', error)
	      })
	  	}

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
				return
			})

		setTimeout(() => {
			window.location.reload(true)
		}, '500');
	}

	const handleChange = (event) => {

		setCompanyData({
			...newCompany,
			input: {
				...newCompany.input,
					[event.target.name]: event.target.value,
				},
			addresses: {
				...newCompany.addresses,
				[event.target.name]: event.target.value,
			}
		})
	}

	return (
		<div className='company'>
			<nav>
				<Link to='/'>Back to List of Companies</Link>
			</nav>
		
			<h2>Input Your Company Information</h2>

			<form onSubmit={handleSubmit}> 
				<div>
					<label>Company Name:</label><br/>
					<input 
						type='text' 
						id='name'
						name='company'
						onChange={handleChange} 
						autoFocus
					/>
				</div>

				<div>
					<label>Percentage Above Cost:</label><br/>
					<input 
						type='text' 
						id='cost_plus'
						name='cost_plus'
						onChange={handleChange} 
					/>
				</div>
					<div>
						<h3>Primary Contact</h3>
						<label>First Name</label>
						<input
							type='text'
							id='first_name'
							name='first_name'
							onChange={handleChange}
						/>
					</div>

				<div>
					<label>Last Name</label>
					<input
						type='text'
						id='last_name'
						name='last_name'
						onChange={handleChange}
					/>
				</div>

				<div>
					<label>Phone:</label><br/>
					<input 
						type='text' 
						id='phone'
						name='phone'
						onChange={handleChange} 
					/>
				</div>

				<div>
					<label>Email:</label><br/>
					<input 
						type='text' 
						id='email'
						name='email'
						onChange={handleChange} 
					/>
				</div>

				<div>
					<h3>Company Address</h3>
					<label>Street:</label><br/>
					<input 
						type='text' 
						id='address1'
						name='address1'
						onChange={handleChange} 
					/>
				</div>

				<div>
					<label>Apartment or Suite:</label><br/>
					<input 
						type='text' 
						id='address2'
						name='address2'
						onChange={handleChange} 
					/>
				</div>

				<div>
					<label>City:</label><br/>
					<input 
						type='text' 
						id='city'
						name='city'
						onChange={handleChange} 
					/>
				</div>

				<div>
					<label>State:</label><br/>
					<input 
						type='text' 
						id='state' 
						name='state'
						onChange={handleChange} 
					/>
				</div>

				<div>
					<label>Zip Code:</label><br/>
					<input 	
						type='text'
						maxLength='5' 
						id='zip'
						name='zip' 
						onChange={handleChange} 
					/>
				</div>

				<div>
					<label>Notes:</label><br/>
					<textarea 
						name='notes' 
						id='notes'
						onChange={handleChange} 
					>
					</textarea>
				</div>

				<button>Create Company</button>
			</form>

			<hr/>
		</div>
	)
}

export default CreateCompany;