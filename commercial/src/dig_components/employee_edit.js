import React, { useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { useLocation, useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function EmployeeEdit(props) {
	const location = useLocation();
	const employeeId = location.state.employeeId;
	const employeeInfo = {
			first_name: location.state.firstName, 
			last_name: location.state.lastName,
			email: location.state.email,
			phone: location.state.phone,
			title: location.state.title,
			notes: location.state.employeeNotes
		};
	const history = useNavigate();

	const [updateEmployee, setEmployeeInfo] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		title: '',
		password: '',
		notes: ''
	})

	console.log('Update Employee', updateEmployee)
	console.log('Employee Info', employeeInfo)

	// Sets state from default values that are set from company.js component
	useEffect(() => {
		setEmployeeInfo(employeeInfo)		
	},[employeeInfo])

	const handleSubmit = event => {
		event.preventDefault();
		axios
			.put('http://localhost:5080/employees/' + employeeId, updateEmployee)
			.then(function(res) {
				console.log('Response', res.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})
	}

	const handleChange = (event) => {
		setEmployeeInfo({
			...updateEmployee,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<div className='company'>
			<nav>
				<button onClick={() => history(-1)}>Back to Company</button>
			</nav>

			<h1>{employeeInfo.firstName}{employeeInfo.lastName}</h1>
		
			<h2>Edit Employee Info</h2>
			<form onSubmit={handleSubmit}> 
				<label>First Name:</label><br/>
				<input 
					type='text' 
					id='first_name'
					name='first_name'
					onChange={handleChange} 
					autoFocus
					defaultValue={employeeInfo.first_name}
				/>
				<br/>

				<label>Last Name:</label><br/>
				<input 
					type='text' 
					id='last_name'
					name='last_name'
					onChange={handleChange} 
					defaultValue={employeeInfo.last_name}
				/>
				<br/>

				<label>Email:</label><br/>
				<input 
					type='text' 
					id='email'
					name='email'
					onChange={handleChange} 
					defaultValue={employeeInfo.email}
				/>
				<br/>

				<label>Phone:</label><br/>
				{/*<input 
					type='text' 
					id='phone'
					name='phone'
					onChange={handleChange} 
					
				/>*/}
				<NumberFormat 
					format='(###)###-####' 
					mask="_"
					type='text' 
					id='phone'
					name='phone'
					onChange={handleChange} 
					defaultValue={employeeInfo.phone}
				 />
				<br/>

				<label>Title:</label><br/>
				<input 
					type='text' 
					id='title' 
					name='title'
					onChange={handleChange} 
					defaultValue={employeeInfo.title}
				/>
				<br/>

				<label>Notes:</label><br/>
				<textarea 
					name='notes' 
					id='notes'
					onChange={handleChange} 
					defaultValue={employeeInfo.notes}
				>

				</textarea>

				<button>Edit {employeeInfo.firstName} {employeeInfo.lastName}</button>
			</form>

			<hr/>
		</div>
	)
}

export default EmployeeEdit;