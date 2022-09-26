import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function CreateCompany(props) {
	const history = useNavigate();
	const localCompanyData = useLocation();
	const localData = localCompanyData.state;
	 console.log('Local Data', localData)

	const startingContact = { 
			firstName: localData.firstName,
			lastName: localData.lastName,
			email: localData.email,
			note: localData.note,
			tags: localData.tags,
			shopify_id: localData.id,
			cost_plus: localData.cost_plus
		}
			
	const startingAddress	=	{
			address1: localData.address1,
			address2: localData.address2,
			city: localData.city,
			company: localData.company,
			phone: localData.phone,
			zip: localData.zip,
			province: localData.province,
			countryCode: localData.countryCode
		}

	const localCompanyUpdate = {
		shopify_id: localData.id,
		company_name: localData.company,
		first_name: localData.firstName,
		last_name: localData.lastName,
		cost_plus: localData.cost_plus,
		notes: localData.note,
		phone: localData.phone,
		email: localData.email
	}

	const [companyAddress, setAddress] = useState({});
	const [contact, setPrimaryContact] = useState();
	const [updateAddress, setUpdateAddress] = useState(startingAddress);
	const [updateContact, setUpdateContact] = useState(startingContact);

	let updatedInfo = {
		updateContact,
		updateAddress
	}

	console.log('Updated Info', updatedInfo)
	console.log('Company ID', localData.id)

	function callAdminApi(event){
		event.preventDefault();
		console.log('Updated Info', updatedInfo)
	    axios.post('http://localhost:5080/shopify_update_company', updatedInfo)
			.then((response) => {
				let companyId = response.data;
			console.log('Response admin api', companyId);
			})
			.catch((error) => {
				console.log('error', error)
			})

		axios.put('http://localhost:5080/companies', localCompanyUpdate)
        	.then((res) => {
        		console.log('pass to local company state in create_company.js', res.data)
        	})
        	.catch(error => {
        		console.log('error in update company_edit.js', error)
        	})
  	}

	const addressChange = (event) => {
		setUpdateAddress({
			...updateAddress,		
				[event.target.name]: event.target.value
		})
	}

	const primaryContact = (event) => {
		setUpdateContact({
			...updateContact,
				[event.target.name]: event.target.value
		})
	}



	return (
		<div className='company'>
				<button onClick={() => history(-1)}>Back To Company</button>
		
			<h2>Input Your Company Information</h2>

			<form onSubmit={callAdminApi}> 
				<div>
					<label>Company Name:</label><br/>
					<input 
						type='text' 
						id='name'
						name='company'
						onChange={addressChange}
						defaultValue={localData.company} 
						autoFocus
					/>
				</div>

				<div>
					<label>Percentage Above Cost:</label><br/>
					<input 
						type='number' 
						id='cost_plus'
						name='cost_plus'
						onChange={primaryContact} 
						defaultValue={localData.cost_plus}
					/>
				</div>

				<div>
					<h3>Primary Contact</h3>
					<label>First Name</label>
					<input
						type='text'
						id='first_name'
						name='firstName'
						onChange={primaryContact}
						defaultValue={localData.firstName}
					/>
				</div>

				<div>
					<label>Last Name</label>
					<input
						type='text'
						id='last_name'
						name='lastName'
						onChange={primaryContact}
						defaultValue={localData.lastName}
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
						onChange={addressChange} 
						defaultValue={localData.phone}
				 	/>
				</div>

				<div>
					<label>Email:</label><br/>
					<input 
						type='text' 
						id='email'
						name='email'
						onChange={primaryContact} 
						defaultValue={localData.email}
					/>
				</div>

				<div>
					<h3>Company Address</h3>
					<label>Street:</label><br/>
					<input 
						type='text' 
						id='address1'
						name='address1'
						onChange={addressChange} 
						defaultValue={localData.address1}
					/>
				</div>

				<div>
					<label>Apartment or Suite:</label><br/>
					<input 
						type='text' 
						id='address2'
						name='address2'
						onChange={addressChange} 
						defaultValue={localData.address2}
					/>
				</div>

				<div>
					<label>City:</label><br/>
					<input 
						type='text' 
						id='city'
						name='city'
						onChange={addressChange} 
						defaultValue={localData.city}
					/>
				</div>

				<div>
					<label>State / Province:</label><br/>
					<input 
						type='text' 
						id='state' 
						name='state'
						onChange={addressChange} 
						defaultValue={localData.province}
					/>
				</div>

				<div>
					<label>Zip Code:</label><br/>
					<input 	
						type='text'
						maxLength='5' 
						id='zip'
						name='zip' 
						onChange={addressChange} 
						defaultValue={localData.zip}
					/>
				</div>

				<div>
					<label>Tracking Tags: The tag 'commercial' must be one of the tracking tags.</label>
					<input
						type='text'
						id='tags'
						name='tags'
						// onChange={contactChange}
						defaultValue={
							localData.tags.map((tag) => {
								return tag
							})
						}
					/>
				</div>

				<div>
					<label>Notes:</label><br/>
					<textarea 
						name='notes' 
						id='notes'
						onChange={addressChange} 
						defaultValue={localData.note}
					>
					</textarea>
				</div>

				<button>Update Company</button>
			</form>

			<hr/>
		</div>
	)
}

export default CreateCompany;
// onClick={() => history(-1)}
