import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EndPointData(props) {
	await axios.get('/companies')
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		})

	return (
		<div>
			
		</div>
	);
}

export default EndPointData;