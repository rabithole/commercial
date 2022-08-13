import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom';

function CreateEmployee(props) {
	// Pulling in company ID to set in the memberships table
	const location = useLocation();
	const companyId = location.state.id;
	const companyName = location.state.companyName;
	const history = useNavigate();

	console.log(window.location.href)
	let currentLocation = window.location.href;

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
		if(newEmployee.first_name == ''){
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
	}

	const handleChange = (event) => {
		setEmployeeInfo({
			...newEmployee,
			[event.target.name]: event.target.value,
		})
	}

	function formatPhoneNumber(value) {
		if(!value) return value;

		const phoneNumber = value.replace(/[^\d]/g, '');
		const phoneNumberLength = phoneNumber.length;

		if(phoneNumberLength < 4) return phoneNumber;
		if(phoneNumberLength < 7) {
			return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
		};
		return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6,)}-${phoneNumber.slice(6,9)}`;
	}

	function phoneNumberFormatter() {
		const phoneInput = document.getElementById('phone');
		const formattedInputValue = formatPhoneNumber(phoneInput.value );
		phoneInput.value = formattedInputValue;
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
					onKeyDown={phoneNumberFormatter}
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

export default CreateEmployee;