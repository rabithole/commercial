import React, { useEffect } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams } from 'react-router-dom';

function SingleCompany(props) {
	let { id } = useParams();
	console.log('Id ---', id) 

	useEffect(() => {
		axios
			.get('http://localhost:5080/companies/single_company')
			.then(function(response) {
				console.log('Response', response.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})
	})

	return (
		<div>
			<nav>
				<Link to='/companies'>Companies</Link>
			</nav>
		
			<h3>Single Company Component</h3>
		</div>
	)
}

export default SingleCompany;