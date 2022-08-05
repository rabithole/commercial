import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams } from 'react-router-dom';

function SingleCompany(props) {
	const [companyData, setCompanyData] = useState([])
	console.log('Company Employees array', companyData.employees)
	console.log('Company', companyData)

	let { id } = useParams();

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

			<h2>Employees</h2>
			<section>
				{companyData.employees && companyData.employees.map((company) => (
					<div className='employee_list' key={id}>
						<p><b>Name:</b> { company.first_name } { company.last_name }</p>
						<p><b>Phone:</b> { company.phone }</p>
						<p><b>Email:</b> { company.email }</p>
						<p><b>Title:</b> { company.title }</p>
					</div>
				))}
			</section>

			<button onClick={deleteItem}>Delete Company</button>
			{/*<Link to='/employees' id='employee_button'>Employees</Link>*/}
		</div>
	)
}

export default SingleCompany;