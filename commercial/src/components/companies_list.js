import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/companies.css';

function CompaniesList(props) {
	const [companiesList, setCompanyList] = useState([]);
	console.log('Companies List', companiesList)
	const [singleCompany, setSingleCompany] = useState([])
	const [employees, setEmployees] = useState([]);
	console.log('employees', employees);

	// Full list of companies
	useEffect( () => {
		axios
			.get('http://localhost:5080/companies')
			.then(function (response) {
				setCompanyList(response.data)
				console.log('Company', response.data)
			})
			.catch(function (error) {
				console.log('Error happened here ---', error);
			});

		// axios
		// 	.get('http://localhost:5080/companies/employees')
		// 	.then(function (response) {
		// 		setEmployees(response.data.company)
		// 	})
	},[]);

	// Search bar from list of companies
	function getCompanyName(event) {
		let inputValue = event.target.value;
		setSingleCompany(inputValue);
	}

	return (
		<div>
			<Link to={'create_company'} id='create_company_button'>Create Company</Link>
			<section className='company-cards-container'>
				<form>
					<h3>Search for Company by Name</h3>
					<input type='text' id='name' name='name' onChange={getCompanyName}></input>
				</form>

				{/* Filters list of Companies */}
				{companiesList.filter((company) => {
					if(singleCompany == '') {
						return company;
					}else if(company.name.toLowerCase().includes(singleCompany.toLowerCase())) {
						return company;
					}
				}).map(({ name, cost_plus, annual_revenue, id}) => (
					
						<div className='company-card' key={id}>
							<Link to={`companies/company${id}`}>
							<h3>{name}</h3>

							<div>
								{/* Markup percentage to be entered from individual companies page */}
								<p>Markup: {cost_plus}%</p>

								{/* Besure to process annual revenue in dollars from the companies model or where ever becomes appropriate */}
								<p>Annual Revenue: ${new  Intl.NumberFormat().format(annual_revenue)}</p>
								<p>List of users to come...</p>
							</div>
							</Link>
						</div>
					
				))}
			</section>
		</div>
	)
}

export default CompaniesList;