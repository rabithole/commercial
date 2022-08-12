import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function CreateCompany(props) {
	// Pulling in company ID to set in the memberships table
	const location = useLocation();
	const companyId = location.state;
	const history = useNavigate();

	const [newEmployee, setEmployeeInfo] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		title: '',
		password: ''
	})

	function setMemberships(newMembership) {
		axios.post('http://localhost:5080/memberships', newMembership)
			.then(function(res) {
				console.log('Membership Response', res)
			})
			.catch(error => {
				console.log('Set Memberships function', newMembership)
				console.log('Membership Error', error)
			})
	}

	const handleSubmit = event => {
		console.log('new Employee', newEmployee)
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
		
			<h2>Add An Employee</h2>
			{/*<p>Company ID: {companyId}</p>*/}

			<form onSubmit={handleSubmit}> 
				<label>First Name:</label><br/>
				<input 
					type='text' 
					id='first_name'
					name='first_name'
					onChange={handleChange} 
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
				<input 
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

				<button>Submit</button>
			</form>

			<hr/>
		</div>
	)
}

export default CreateCompany;