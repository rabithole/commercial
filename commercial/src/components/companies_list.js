import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CompaniesList(props) {
	const [companiesList, setCompanyList] = useState([]);

	useEffect( () => {
		axios
			.get('http://localhost:5080/companies')
			.then(function (response) {
				setCompanyList(response.data)
				// var companiesList = response.data;
				console.log('Response Yes', response.data[0].name);
			})
			.catch(function (error) {
				console.log('Error happened here ---', error);
			})
		},[]);

	return (
		<section>
			{companiesList.map(company => (
				<div>
					<h3>Name: {company.name}</h3>
					<p>Address: <br/>{company.street}<br/>{company.city} {company.state} {company.zip}</p>

					<p>Markup: {company.cost_plus}</p>
					<p>Annual Revenue: {company.annual_revenue}</p>
					<p>List of users to come...</p>
					
				</div>
			))}
		</section>
	)
}

export default CompaniesList;