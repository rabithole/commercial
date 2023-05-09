import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams } from 'react-router-dom';

function SingleCompany(props) {
	const [employeeData, setEmployeeData] = useState({})

	let { id } = useParams();

	useEffect(() => {
		axios
			.get('http://localhost:5080/employees/employee/' + id)
			.then(function(response) {
				// console.log('Response', response.data)
				setEmployeeData(response.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})
	},[id]);

	const deleteItem = (event, item) => {
	    event.preventDefault();
	    	axios.delete('http://localhost:5080/employees/' + id)
	      		.then(res => {
	        		console.log('This employee has been removed from the database', employeeData)
	      })
  	}

	return (
		<div className='company'>
			<nav>
				<Link to='/employees'>Back to Employees List</Link>
			</nav>
		
			<h2>{employeeData.first_name} {employeeData.last_name}</h2>
			<h4>Email:</h4> 
			<blockquote>{employeeData.email}</blockquote>
			<h4>Phone:</h4> 
			<blockquote>{employeeData.phone}</blockquote>
			<h4>Title:</h4> 
			<blockquote>{employeeData.title}</blockquote>

			<button onClick={deleteItem}>Delete Employee</button>
		</div>
	)
}

export default SingleCompany;