import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams, useLocation } from 'react-router-dom';

function SingleCompany(props) {
	const [localCompanyData, setCompanyData] = useState([]);
	const [primaryEmployee, setPrimaryEmployeeList] = useState([])
	const [shopifyData, setShopifyData] = useState([]);
	const [shopifyAddressData, setAddressData] = useState([]);
	// console.log('primary employee', primaryEmployee);
	// console.log('Company Name', localCompanyData);
	console.log('Shopify Data', shopifyData)
	// console.log('Address Data', shopifyAddressData)

	let { id } = useParams();

	useEffect(() => {
		axios
			.get('http://localhost:5080/companies/company/' + id)
			.then(function(response) {
				setCompanyData(response.data);
				setPrimaryEmployeeList(response.data.employees);
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})
		axios
			.post('http://localhost:5080/shopify_get_company')
			.then((response) => {
				let shopifyResponseData = response.data.data.customer.addresses;

				shopifyResponseData.map((address) => {
					console.log('Address', address);
					setAddressData(address);
				})
				setShopifyData(response.data.data.customer)
			})
			.catch((error) => {
				console.log('Error', error)
			})
	},[]);

	const deleteItemCompany = (event, item) => {
	    event.preventDefault();
	    	axios.delete('http://localhost:5080/companies/' + id)
	      		.then(res => {
	        		console.log('This Company has been deleted', localCompanyData)
	      })
  	}

  	const deleteEmployee = (id, event, item) => {
  		console.log('current target', localCompanyData.employees[1], id)
	    	axios.delete('http://localhost:5080/employees/' + id)
	      		.then(res => {
	        		console.log('This employee has been deleted', localCompanyData);
	      })

  		setTimeout(() => {
			window.location.reload(true);
		}, '500');
  	}

  	const formatPhoneNumber = (str) => {
		//Filter only numbers from the input
		let cleaned = ('' + str).replace(/\D/g, '');

		//Check if the input is of correct length
		let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3]
		};

		return null
	};

	return (
		<div className='company'>
			<nav>
				<Link to='/'>Back to List of Companies</Link>
			</nav>
		
			<h1 style={{textAlign: 'center'}}>{localCompanyData.company_name}</h1>
			<h2>Primary Contact</h2>
			<blockquote>{shopifyData.displayName}</blockquote>

			<h4>Phone:</h4>
			<blockquote>{shopifyAddressData.phone}</blockquote>

			<h4>Email:</h4>
			<blockquote>{localCompanyData.email}</blockquote>

			<h2>{localCompanyData.company_name} Address</h2>
			<h4>Street:</h4> 
			<blockquote>{shopifyAddressData.address1} - Apt/Suite: {shopifyAddressData.address2}</blockquote>

			<h4>City:</h4> 
			<blockquote>{shopifyAddressData.city}</blockquote>

			<h4>State:</h4> 
			<blockquote>{shopifyAddressData.provinceCode}</blockquote>

			<h4>Zip:</h4> 
			<blockquote>{shopifyAddressData.zip}</blockquote>

			<h2>Basic Monetary Details</h2>
			<h4>Cost Plus / Percentage above our cost</h4>
			<blockquote>{localCompanyData.cost_plus}%</blockquote>

			<h4>Annual Revenue:</h4> 
			<blockquote>${new  Intl.NumberFormat().format(localCompanyData.annual_revenue)}</blockquote>

			<h4>Notes</h4>
			<blockquote className='notes'>{shopifyData.note}</blockquote>

			<h4>Shopify ID</h4>
			<blockquote>{localCompanyData.shopify_id}</blockquote>

			<Link 
				to={'/company_edit'}
				state={localCompanyData}
				>Edit Company Info
			</Link>
			<button onClick={deleteItemCompany}>Delete Company</button>

			<h2 id='companyH2'>Employees</h2>
			
			<Link 
				to='/employees/create_employee'
				id='create_employee_button'
				// state is passing the id of the company a new employee is being created for 
				state={{id: id, companyName: localCompanyData.name}}
				>Add Employee
			</Link>

			{/* List of employees working for or with the company */}
			{/*<section>
				{primaryEmployee.map((employee) => (
					<div className='employee_list' key={ employee.id }>
						<p><b>Name:</b> { employee.first_name } { employee.last_name }</p>
						<p><b>Phone:</b> { formatPhoneNumber(employee.phone) }</p>
						<p><b>Email:</b> { employee.email }</p>
						<p><b>Title:</b> { employee.title }</p>
						<p>{employee.id}</p>

						<label>Check if primary contact</label>
						<input 
							type='checkbox' 
							id='primary-contact' 
							name='primary-contact'
							onChange={event => checkForPrimaryContact(event, employee.id)}
							checked={employee.primary}
						>
						</input>
						<blockquote className='notes'>{ employee.notes }</blockquote>
						<Link 
							to='/employee_edit'
							state={{ 
								firstName: employee.first_name,
								lastName: employee.last_name,
								phone: employee.phone,
								email: employee.email,
								title: employee.title,
								employeeId: employee.id,
								employeeNotes: employee.notes
							 }}
							>Edit Employee Info
						</Link>
						<button onClick={ () => deleteEmployee(employee.id)}>Delete Employee</button>
					</div>
				))}
			</section>*/}

			
		</div>
	)
}

export default SingleCompany;