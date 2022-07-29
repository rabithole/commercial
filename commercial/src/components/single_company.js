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
		<div>
			<nav>
				<Link to='/'>Back to List of Companies</Link>
			</nav>
		
			<h3>{companyData.name}</h3>
			<p>{companyData.street}</p>
			<p>{companyData.city}</p>
			<p>{companyData.state}</p>
			<p>{companyData.zip}</p>
			<p>{companyData.cost_plus}</p>
			<p>{companyData.annual_revenue}</p>
		</div>
	)
}

export default SingleCompany;