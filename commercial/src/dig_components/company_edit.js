import React, { useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { useNavigate, useLocation } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function CompanyEdit(props) {
	const backToCompany = useNavigate();
	const localCompanyData = useLocation();
	const localData = localCompanyData.state;
	const localDbId = Number(localData.localCompanyId);

	// startingContact and startingAddress are organizing company info to be shaped in the Graphql query in shopify_update_company.js going to shopify. 
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
		provinceCode: localData.province,
		countryCode: localData.countryCodeV2,
		note: localData.note
	}

	const [updateAddress, setUpdateAddress] = useState(startingAddress);
	const [updateContact, setUpdateContact] = useState(startingContact);

	// To be send to our local db.
	const localCompanyUpdate = {
		shopify_id: localData.id,
		company_name: updateAddress.company,
		first_name: updateContact.firstName,
		last_name: updateContact.lastName,
		cost_plus: updateContact.cost_plus,
		note: updateContact.note,
		phone: updateAddress.phone,
		email: updateContact.email
	}

	// Passed to shopify update route to be shaped in a Graphql query to Shopify.
	let updatedInfo = {
		updateContact,
		updateAddress
	}

	async function updateCompanyShopifyData(event){
		event.preventDefault();
	    await axios.post('http://localhost:5080/shopify_update_company', updatedInfo)
			.then((response) => {
				let error = response.data.data.customerUpdate.userErrors;
				if(error == 0){
					updateLocalCompanyData();
				} else {
					console.log('There was an error', error)
				}
			})
			.catch((error) => {
				console.log('error', error)
			})
  	}

  	async function updateLocalCompanyData(event){
  		await axios.put('http://localhost:5080/companies/' + localDbId, localCompanyUpdate)
        	.then((res) => {
        		backToCompany(localData.companyURL)
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
				<button onClick={() => backToCompany(-1)}>Back To Company</button>
		
			<h2>Input Your Company Information</h2>

			<form onSubmit={updateCompanyShopifyData}> 
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
						name='provinceCode'
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
						onChange={primaryContact}
						defaultValue={
							localData.tags.map((tag) => {
								return ` ${tag}`
							})
						}
					/>
				</div>

				<div>
					<label>Notes:</label><br/>
					<textarea 
						name='note' 
						id='note'
						onChange={primaryContact} 
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

export default CompanyEdit;
