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

	return (
		<div>
			<Link to={'companies/create_company'} id='create_company_button'>Create Company</Link>
			<section className='company-cards-container'>
				<form>
					<h3>Search for Company by Name</h3>
					<input type='text' id='name' name='name' onChange={getCompanyName}></input>
				</form>

				{companiesList.filter((company) => {
					if(singleCompany == '') {
						return company;
					}else if(company.name.toLowerCase().includes(singleCompany.toLowerCase())) {
						return company;
					}
				}).map(({ name, cost_plus, annual_revenue, id}) => (
					<Link to={`companies/single_company${id}`}>
						<div className='company-card' key={id}>
							<h3>{name}</h3>

							<div>
								{/* Markup percentage to be entered from individual companies page */}
								<p>Markup: {cost_plus}%</p>

								{/* Besure to process annual revenue in dollars from the companies model or where ever becomes appropriate */}
								<p>Annual Revenue: ${new  Intl.NumberFormat().format(annual_revenue)}</p>
								<p>List of users to come...</p>
							</div>

						</div>
					</Link>
				))}
			</section>
		</div>
	)
}

export default CompaniesList;