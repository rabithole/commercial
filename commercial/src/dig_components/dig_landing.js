import React, { } from 'react';
import { Route, Routes } from 'react-router-dom';
// import axios from 'axios';
import '../css/companies.css';
import CompaniesList from './companies_list';
import DigHeader from './dig_header';
import SingleCompany from './company';
import CreateCompany from './create_company';

function DigLanding(props) {


	return (
		<div className='company_list_container'>
			<DigHeader />
            <Routes>
                <Route path='/company/:id' element={<SingleCompany />} />
                <Route path='/companies_list' element={<CompaniesList />} /> 
                <Route path='/create_company' element={<CreateCompany />} />
            </Routes>
            
		</div>
	)
}

export default DigLanding;