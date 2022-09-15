import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function CreateCompany(props) {
	// console.log('Create Company Refresh')
	let history = useNavigate();

	const [newCompany, setCompanyData] = useState({});
	const [primaryContact, setPrimaryContact] = useState({});
	const [company, setNewCompany] = useState();
	const [error, setError] = useState();
	// console.log('New Company', newCompany);
	// console.log('Primary Contact', primaryContact);
	// console.log('Final Company', company);


	function callAdminApi(event){
		event.preventDefault();
	    axios
	      .post('http://localhost:5080/admin_api', company)
	      .then(function(response) {
	        console.log('Response admin api', response.data.errors[0])
	        // setError(JSON.stringify(response.data.errors[0]))
	      })
	      .catch(error => {
	      	if(error == undefined){
	      		return
	      	}else {
	      		console.log('Errorer', error)
	      	}
	      })
	  	}

	const companyChange = (event) => {
		setCompanyData({
			...newCompany,
			[event.target.name]: event.target.value,
		})
		setNewCompany({
			...company,
				input: {
					...primaryContact
				},
				addresses: {
					...newCompany
				}
			}
		)
	}

	const contactChange = event => {
		setPrimaryContact({
			...primaryContact,
			[event.target.name]: event.target.value,
		})
	}
	
	return (
		<div className='company'>
			<nav>
				<Link to='/'>Back to List of Companies</Link>
			</nav>
		
			<h2>Input Your Company Information</h2>
			<h1 style={{backgroundColor: "red"}}>{error}</h1>

			<form onSubmit={callAdminApi}> 
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
						<h3>Primary Contact</h3>
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
					<NumberFormat  
						format='###-###-####'
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
					<h3>Company Address</h3>
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
					<label>Notes:</label><br/>
					<textarea 
						name='notes' 
						id='notes'
						onChange={companyChange} 
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