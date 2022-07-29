import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/companies.css';

function CompaniesList(props) {
	const [companiesList, setCompanyList] = useState([]);
	const [singleCompany, setSingleCompany] = useState([])

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

	function getCompanyName(event) {
		let inputValue = event.target.value;
		setSingleCompany(inputValue);
	}

	function submitSearchQuery(event) {
		// alert('Input Value is?:', singleCompany)
		axios
			.get(`http://localhost:5080/companies/${singleCompany}`)
			.then(function(response) {
				console.log('Company Info', response.data)
			}) 
			.catch(error => {
				console.log('Error has occured ---', error );
			})
		event.preventDefault();
	}

	return (
		<section className='company-cards-container'>
			<form onSubmit={submitSearchQuery}>
				<p>Search for Company by Name</p>
				<input type='text' id='name' name='name' onChange={getCompanyName}></input>
			</form>

			{companiesList.filter((company) => {
				if(singleCompany == '') {
					return company;
				}else if(company.name.toLowerCase().includes(singleCompany.toLowerCase())) {
					return company;
				}
			}).map((company) => (
				<Link to={`/single_company/${singleCompany}`}>
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
				</Link>
			))}
		</section>
	)
}

export default CompaniesList;