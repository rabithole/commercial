import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/companies.css';

function CompaniesList(props) {
	const [companiesList, setCompanyList] = useState([]);
	const [singleCompany, setSingleCompany] = useState([])
	const [employees, setEmployees] = useState([]);
	console.log('Employee', employees)
	console.log('List of companies', companiesList)

	// Full list of companies
	useEffect( () => {
		axios
			.get('http://localhost:5080/companies')
			.then(function (response) {
				setCompanyList(response.data)
			})
			.catch(function (error) {
				console.log('Error happened here ---', error);
			});
	},[]);

	// Search bar from list of companies
	function getCompanyName(event) {
		let inputValue = event.target.value;
		setSingleCompany(inputValue);
	}

	return (
		<div className='company-list-container'>
			<Link to={'create_company'} id='create_company_button'>Create Company</Link>
				<form>
					<h3>Search for Company by Name</h3>
					<input type='text' id='name' name='name' onChange={getCompanyName}></input>
				</form>

			<section className='company-cards-container'>

				{/* Filters list of Companies */}
				{companiesList.filter((company) => {
					if(singleCompany == '') {
						return company;
					}else if(company.company_name.toLowerCase().includes(singleCompany.toLowerCase())) {
						return company;
					}
				}).map(({ company_name, cost_plus, annual_revenue, id, notes, first_name, last_name, phone}) => (
					
						<div className='company-card' key={id}>
							<Link to={`companies/company${id}`}>
								<h3>{company_name}</h3>

								<div className='inside-card'>
									{/* Markup percentage to be entered from individual companies page */}
									<p>Markup: {cost_plus}%</p>

									<p><b>Primary Contact:</b> {first_name} {last_name}</p>
									<p>Phone: {phone}</p>

									{/* Besure to process annual revenue in dollars from the companies model or where ever becomes appropriate */}
									<p>Annual Revenue: ${new  Intl.NumberFormat().format(annual_revenue)}</p>
								</div>

								{/*<div className='inside-card'>
									<p>Primary Contact</p>
									<p>Phone:</p>
									<p>Email:</p>
								</div>*/}

								<p id='notes'>{notes}</p>
							</Link>
						</div>
					
				))}
			</section>
		</div>
	)
}

export default CompaniesList;