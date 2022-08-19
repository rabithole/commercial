import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/companies.css';

function CompaniesList(props) {
	const [employees, setEmployees] = useState([]);
	console.log('employees', employees)

	useEffect( () => {
		axios
			.get('http://localhost:5080/employees')
			.then(function (response) {
				setEmployees(response.data)
			})
			.catch(function (error) {
				console.log('Error happened here ---', error);
			})
	},[]);

	return (
		<div>
			<Link to={'create_employee'} id='create_company_button'>Add Employee</Link>
			<section className='company-cards-container'>

				{employees.map(({ first_name, last_name, id, email, phone, title }) => (
						<div className='company-card' key={id}>
							<Link to={`employee/${id}`}>
							<h3>{first_name} {last_name}</h3>
							<div>
								<p>Email: {email} </p>
								<p>Phone: {phone} </p>
								<p>Title: {title}</p>
							</div>
							</Link>
						</div>
					
				))}
			</section>

			<Link to='/' id='employee_button'>Company List</Link>
		</div>
	)
}

export default CompaniesList;