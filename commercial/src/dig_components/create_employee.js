import React, { useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

function CreateEmployee(props) {
	// Pulling in company ID to set in the memberships table
	const location = useLocation();
	const companyId = location.state.id;
	const companyName = location.state.companyName;
	const history = useNavigate();

	const [newEmployee, setEmployeeInfo] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		title: '',
		password: ''
	})

	console.log('New Employee', newEmployee.first_name)

	function setMemberships(newMembership) {
		axios.post('http://localhost:5080/memberships', newMembership)
			.then(function(res) {
				console.log('Membership Response', res)
			})
			.catch(error => {
				// console.log('Set Memberships function', newMembership)
				console.log('Membership Error', error)
			})
	}

	const handleSubmit = event => {
		if(newEmployee.first_name === ''){
			console.log('Must enter info')
			alert('Must fill out form')
		} 
		
		event.preventDefault();
		
		axios
			.post('http://localhost:5080/employees', newEmployee)
			.then(function(res) {
				setMemberships({
					company_id: Number(companyId), 
					user_id: res.data.id,
					status: 'y'
				});
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
		setEmployeeInfo({
			...newEmployee,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<div className='company'>
			<nav>
				<button onClick={() => history(-1)}>Back to Company</button>
			</nav>

			<h1>{companyName}</h1>
		
			<h2>Add An Employee</h2>
			{/*<p>Company ID: {companyId}</p>*/}

			<form onSubmit={handleSubmit}> 
				<label>First Name:</label><br/>
				<input 
					type='text' 
					id='first_name'
					name='first_name'
					onChange={handleChange} 
					autoFocus
				/>
				<br/>

				<label>Last Name:</label><br/>
				<input 
					type='text' 
					id='last_name'
					name='last_name'
					onChange={handleChange} 
				/>
				<br/>

				<label>Email:</label><br/>
				<input 
					type='text' 
					id='email'
					name='email'
					onChange={handleChange} 
				/>
				<br/>

				<label>Phone:</label><br/>
				{/*<input 
					type='text' 
					id='phone'
					name='phone'
					onChange={handleChange} 
					
				/>*/}
				<NumericFormat 
					format='(###)###-####' 
					mask="_"
					type='text' 
					id='phone'
					name='phone'
					onChange={handleChange} 
				 />
				<br/>

				<label>Title:</label><br/>
				<input 
					type='text' 
					id='title' 
					name='title'
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

				<button onClick={() => history(-1)}>Submit</button>
			</form>

			<hr/>
		</div>
	)
}

export default CreateEmployee;