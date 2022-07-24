import React, { useEffect } from 'react';
import axios from 'axios';
// import Company from '../routes/companies_controller';

function EndPointData(props) {

	useEffect(() => {
		// axios.get('https://10.0.2.2:5080/companies')
		axios.get('/../../routes/index')
			.then(function (response) {
				var info = response.data;
				console.log('Response Yes', response, info);
			})
			.catch(function (error) {
				console.log('Error happened here ---', error);
			})
		})

	return (
		<div>
			Data is being requested here...
		</div>
	);
}

export default EndPointData;