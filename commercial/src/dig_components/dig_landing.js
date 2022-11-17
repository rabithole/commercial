import React, { } from 'react';
import { Route, Routes } from 'react-router-dom';
// import axios from 'axios';
import '../css/companies.css';
import CompanyList from './companies_list';
import DigHeader from './dig_header';
import Company from './company';
import CreateCompany from './create_company';

function DigLanding(props) {


	return (
		<div className='company_list_container'>
			<DigHeader />
            <Routes>
                <Route path='/company_list' element={<CompanyList />} /> 
                <Route path='/company_list/company:id' element={<Company />} />
                <Route path='/company_list/create_company' element={<CreateCompany />} />
            </Routes>
            
		</div>
	)
}

export default DigLanding;