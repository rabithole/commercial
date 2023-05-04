import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

function SingleCompany(props) {
	const [localCompanyData, setLocalCompanyData] = useState([]);
	const [shopifyData, setShopifyData] = useState([]);
	const [shopifyAddressData, setAddressData] = useState([]);

	const backToCompaniesList = useNavigate();

	let { id } = useParams();
	let companyURL = {companyURL: window.location.pathname};

	useEffect(() => {
		axios
			.get('http://localhost:5080/companies/company/' + id)
			.then(function(response) {
				console.log('response', response.data)
				setLocalCompanyData(response.data);
				getShopifyCompanyData(response.data.shopify_id, response.data.cost_plus, id)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})

		function getShopifyCompanyData(shopify_id, cost_plus, localId){
			axios
				.post('http://localhost:5080/shopify_get_company', {id: shopify_id})
				.then((response) => {
					let shopifyCustomerAddress = response.data.data.customer.addresses;
					let shopifyCustomerData = response.data.data.customer;
					let costPlus = {cost_plus: cost_plus};
					let address = {};
					let localCompanyId = {localCompanyId: localId};
					shopifyCustomerAddress.map((companyAddress) => {
						setAddressData(companyAddress);
						address = companyAddress
						return address;
					})

					setShopifyData({
						...shopifyData,
							...shopifyCustomerData,
							...costPlus,
							...address,
							...localCompanyId,
							...companyURL
					})
				})
				.catch((error) => {
					console.log('Error', error)
				})
		}
	},[]);

	const deleteItemCompany = (event, item) => {
	    event.preventDefault();
	    	axios.delete('http://localhost:5080/companies/' + id)
	      		.then(res => {
	        		console.log('This Company has been deleted', localCompanyData)
					backToCompaniesList(-1);
	      		})
				.catch(error => {
					console.log('error company.js')
				})
  	}

	let tag = false;
	if(shopifyData.length === 0){
		// console.log('false')
		tag = false;
	} else {
		// console.log('true')
		tag = true;
	}

	return (
		<div className='company'>
			<nav>
				<Link to='/dig_landing/companies_list'>Back to List of Companies</Link>
			</nav>
		
			<h1 style={{textAlign: 'center'}}>{shopifyAddressData.company}</h1>
			<h2>Primary Contact</h2>
			<blockquote>{shopifyData.displayName}</blockquote>

			<h4>Phone:</h4>
			<blockquote>{shopifyAddressData.phone}</blockquote>

			<h4>Email:</h4>
			<blockquote>{localCompanyData.email}</blockquote>

			<h2>Address</h2>
			<h4>Street:</h4> 
			<blockquote>{shopifyAddressData.address1} - Apt/Suite: {shopifyAddressData.address2}</blockquote>

			<h4>City:</h4> 
			<blockquote>{shopifyAddressData.city}</blockquote>

			<h4>State:</h4> 
			<blockquote>{shopifyAddressData.province}</blockquote>

			<h4>Zip:</h4> 
			<blockquote>{shopifyAddressData.zip}</blockquote>

			<h2>Basic Monetary Details</h2>
			<h4>Cost Plus / Percentage above our cost</h4>
			<blockquote>{localCompanyData.cost_plus}%</blockquote>

			<h4>Annual Revenue:</h4> 
			<blockquote>${new  Intl.NumberFormat().format(localCompanyData.annual_revenue)}</blockquote>

			<h4>Notes</h4>
			<blockquote className='notes'>{localCompanyData.note}</blockquote>

			<h4>Tracking Tags</h4>
			<blockquote>{tag ? shopifyData.tags.map((tag) => {
							return ` ${tag},`
						}) : 'false'}
			</blockquote>

			<h4>Shopify ID</h4>
			<blockquote>{localCompanyData.shopify_id}</blockquote>

			<Link 
				to={'/company_edit'}
				state={shopifyData}
				>Edit Company Info
			</Link>
			<button onClick={deleteItemCompany}>Delete Company</button>

			<h2 id='companyH2'>Employees</h2>
		</div>
	)
}

export default SingleCompany;