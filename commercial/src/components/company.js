import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams } from 'react-router-dom';

function SingleCompany(props) {
	const [companyData, setCompanyData] = useState([])
	// console.log('Company Employees array', companyData.employees)
	console.log('Company', companyData)

	let { id } = useParams();
	console.log('ID from params', id, companyData.name)

	useEffect(() => {
		axios
			.get('http://localhost:5080/companies/company/' + id)
			.then(function(response) {
				setCompanyData(response.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})
	},[]);

	const deleteItem = (event, item) => {
	    event.preventDefault();
	    	axios.delete('http://localhost:5080/companies/' + id)
	      		.then(res => {
	        		console.log('This Company has been deleted', companyData)
	      })
  	}

  	let formatPhoneNumber = (str) => {
		//Filter only numbers from the input
		let cleaned = ('' + str).replace(/\D/g, '');

		//Check if the input is of correct length
		let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3]
		};

		return null
	};

	return (
		<div className='company'>
			<nav>
				<Link to='/'>Back to List of Companies</Link>
			</nav>
		
			<h2>{companyData.name}</h2>
			<h4>Street:</h4> 
			<blockquote>{companyData.street}</blockquote>
			<h4>City:</h4> 
			<blockquote>{companyData.city}</blockquote>
			<h4>State:</h4> 
			<blockquote>{companyData.state}</blockquote>
			<h4>Zip:</h4> 
			<blockquote>{companyData.zip}</blockquote>
			<h4>Cost Plus / Percentage above our cost</h4>
			<blockquote>{companyData.cost_plus}%</blockquote>
			<h4>Annual Revenue:</h4> 
			<blockquote>${new  Intl.NumberFormat().format(companyData.annual_revenue)}</blockquote>

			<Link to='/'>Edit Company Info</Link>

			<h2>Employees</h2>
			<button onClick={deleteItem}>Delete Company</button>
			<Link 
				to='/employees/create_employee'
				id='create_employee_button'
				// state is passing the id of the company a new employee is being created for 
				state={{id: id, companyName: companyData.name}}
				>Add Employee
			</Link>

			<section>
				{companyData.employees && companyData.employees.map((company) => (
					<div className='employee_list' key={id}>
						<p><b>Name:</b> { company.first_name } { company.last_name }</p>
						<p><b>Phone:</b> {formatPhoneNumber(company.phone) }</p>
						<p><b>Email:</b> { company.email }</p>
						<p><b>Title:</b> { company.title }</p>
						<Link to='/'>Edit Employee Info</Link>
					</div>
				))}
			</section>

			
		</div>
	)
}

export default SingleCompany;