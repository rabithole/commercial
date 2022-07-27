import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';

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
		<section className='company-cards-container'>
			{companiesList.map(company => (
				<div className='company-card'>
					<h3>{company.name}</h3>
					<div>
				{/* Markup percentage to be entered from individual companies page */}
						<p>Markup: {company.cost_plus}%</p>

					{/* Besure to process annual revenue in dollars from the companies model or where ever becomes appropriate */}
						<p>Annual Revenue: ${company.annual_revenue}</p>
						<p>List of users to come...</p>
					</div>
					
				</div>
			))}
		</section>
	)
}

export default CompaniesList;