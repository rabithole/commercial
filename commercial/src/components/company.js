import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../css/companies.css';
import { Link, useParams, useLocation } from 'react-router-dom';

function SingleCompany(props) {
	const [companyData, setCompanyData] = useState([])
	const ref = useRef(null);
	console.log('Company', companyData)

	let { id } = useParams();
	console.log('ID from params', id, companyData)

	useEffect(() => {
		axios
			.get('http://localhost:5080/companies/company/' + id)
			.then(function(response) {
				setCompanyData(response.data)
			})
			.catch(error => {
				console.log('Error, error, error', error)
			})
	},[]);

	const deleteItemCompany = (event, item) => {
	    event.preventDefault();
	    	axios.delete('http://localhost:5080/companies/' + id)
	      		.then(res => {
	        		console.log('This Company has been deleted', companyData)
	      })
  	}

  	const deleteEmployee = (id, event, item) => {
  		console.log('current target', companyData.employees[1], id)
	    // event.preventDefault();
	    	axios.delete('http://localhost:5080/employees/' + id)
	      		.then(res => {
	        		console.log('This employee has been deleted', companyData)
	      })

  		setTimeout(() => {
			window.location.reload(true)
		}, '500');
  	}

  	let formatPhoneNumber = (str) => {
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
		
			<h2>{companyData.name}</h2>
			<h4>Street:</h4> 
			<blockquote>{companyData.street}</blockquote>
			<h4>City:</h4> 
			<blockquote>{companyData.city}</blockquote>
			<h4>State:</h4> 
			<blockquote>{companyData.state}</blockquote>
			<h4>Zip:</h4> 
			<blockquote>{companyData.zip}</blockquote>
			<h4>Cost Plus / Percentage above our cost</h4>
			<blockquote>{companyData.cost_plus}%</blockquote>
			<h4>Annual Revenue:</h4> 
			<blockquote>${new  Intl.NumberFormat().format(companyData.annual_revenue)}</blockquote>

			<Link 
				to={'/company_edit'}
				state={companyData}
				>Edit Company Info
			</Link>
			<button onClick={deleteItemCompany}>Delete Company</button>

			<h2 id='companyH2'>Employees</h2>
			
			<Link 
				to='/employees/create_employee'
				id='create_employee_button'
				// state is passing the id of the company a new employee is being created for 
				state={{id: id, companyName: companyData.name}}
				>Add Employee
			</Link>

			{/* List of employees working for or with the company */}
			<section>
				{companyData.employees && companyData.employees.map((employee) => (
					<div className='employee_list' key={employee.id}>
						<p><b>Name:</b> { employee.first_name } { employee.last_name }</p>
						<p><b>Phone:</b> { formatPhoneNumber(employee.phone) }</p>
						<p><b>Email:</b> { employee.email }</p>
						<p><b>Title:</b> { employee.title }</p>
						<p>ID: {employee.id}</p>
						<Link 
							to='/employee_edit'
							state={{ 
								firstName: employee.first_name,
								lastName: employee.last_name,
								phone: employee.phone,
								email: employee.email,
								title: employee.title,
								employeeId: employee.id
							 }}
							>Edit Employee Info
						</Link>
						<button onClick={ () => deleteEmployee(employee.id)}>Delete Employee</button>
					</div>
				))}
			</section>

			
		</div>
	)
}

export default SingleCompany;