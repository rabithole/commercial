import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams } from 'react-router-dom';

function SingleCompany(props) {
	const [companyData, setCompanyData] = useState({})
	console.log('Company Data', companyData)

	let { id } = useParams();
	console.log('Id ---', id) 

	useEffect(() => {
		axios
			.get('http://localhost:5080/companies/single_company/' + id)
			.then(function(response) {
				console.log('Response', response.data)
				setCompanyData(response.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})
	},[]);

	return (
		<div className='single_company'>
			<nav>
				<Link to='/'>Back to List of Companies</Link>
			</nav>
		
			<h3>{companyData.name}</h3>
			<p>Street: {companyData.street}</p>
			<p>City: {companyData.city}</p>
			<p>State: {companyData.state}</p>
			<p>Zip: {companyData.zip}</p>
			<p>Pricing: {companyData.cost_plus}% Above our cost.</p>
			<p>Annual Revenue: ${new  Intl.NumberFormat().format(companyData.annual_revenue)}</p>
		</div>
	)
}

export default SingleCompany;