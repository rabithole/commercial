import React, { useEffect } from 'react';
import '../css/companies.css';
import { Link } from 'react-router-dom';

function SingleCompany(props) {

	return (
		<div>
			<nav>
				<Link to='/companies'>Companies</Link>
			</nav>
		
			<h3>Single Company Component</h3>
		</div>
	)
}

export default SingleCompany;