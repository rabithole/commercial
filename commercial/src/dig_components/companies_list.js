import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/companies.css';

function CompaniesList(props) {
	const [companiesList, setCompanyList] = useState([]);
	const [searchedForCompany, setCompanyFilter] = useState([])

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
		setCompanyFilter(inputValue);
	}

	return (
		<div className='company_list_container'>
			<Link to={'/dig_landing/create_company'} id='create_company_button'>Create Company</Link>
				<form>
					<h3>Search for Company by Name</h3>
					<input type='text' id='name' name='name' onChange={getCompanyName}></input>
				</form>

			<section className='company_cards_container'>

				{/* Filters list of Companies */}
				{companiesList.filter((company) => {
					if(searchedForCompany == '') {
						return company;
					}else if(company.company_name.toLowerCase().includes(searchedForCompany.toLowerCase())) {
						return company;
					}
				}).map(({ company_name, cost_plus, annual_revenue, id, note, first_name, last_name, phone}) => (
					
						<div className='company_card' key={id}>
							<Link to={`/dig_landing/company/${id}`}>
								<h3>{company_name}</h3>

								<div>
									{/* Markup percentage to be entered from individual companies page */}
									<p>Markup: {cost_plus}%</p>

									<p><b>Primary Contact:</b> {first_name} {last_name}</p>
									<p>Phone: {phone}</p>

									{/* Besure to process annual revenue in dollars from the companies model or where ever becomes appropriate */}
									<p>Annual Revenue: ${new  Intl.NumberFormat().format(annual_revenue)}</p>
								</div>
								<p>ID: {id}</p>
								<p id='notes'>{note}</p>
							</Link>
						</div>
				))}
			</section>
		</div>
	)
}

export default CompaniesList;