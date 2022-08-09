import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useLocation } from 'react-router-dom';

function CreateCompany(props) {
	// Pulling in company ID to set in the memberships table
	const location = useLocation();
	const state = location.state;
	console.log("State / company ID", state)

	const [newEmployee, setEmployeeInfo] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		title: '',
		password: ''
	})

	// const [newMembership, setEmployeeMembership] = useState({
	// 	company_id: state,
	// 	user_id: 0,
	// 	status: 't'
	// }) 
	// console.log('New Membership', newMembership)
	console.log('New Employee', newEmployee)

	function setMemberships(newMembership) {
		axios.post('http://localhost:5080/memberships', newMembership)
			.then(function(res) {
				console.log('New membershipt from set Membership function', newMembership)
				console.log('Membership Response', res)
			})
			.catch(error => {
				console.log('Set Memberships function', newMembership)
				console.log('Membership Error', error)
			})
	}

	const handleSubmit = event => {
		event.preventDefault();
		axios
			.post('http://localhost:5080/employees', newEmployee)
			.then(function(res) {
				// console.log('Membership', newMembership)
				// setEmployeeMembership({
				// 	company_id: Number(state), 
				// 	user_id: res.data.id,
				// 	status: 'y'
				// })
				setMemberships({
					company_id: Number(state), 
					user_id: res.data.id,
					status: 'y'
				});
				console.log('Response', res.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})

		// axios.post('http://localhost:5080/memberships', newMembership)
		// 	.then(function(res) {
		// 		console.log('Membership Response', res)
		// 	})
		// 	.catch(error => {
		// 		console.log('Membership Error', error)
		// 	})
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
				<Link to='/companies/company'>Back to Company</Link>
			</nav>
		
			<h2>Add An Employee</h2>
			{/*<p>Company ID: {state}</p>*/}

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