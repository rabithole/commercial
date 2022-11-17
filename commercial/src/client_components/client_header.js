import React, { useState } from 'react';
import { } from 'react-router-dom';

function ClientHeader(props) {
  let companyAddressField = props.companyAddressField;

  return (
    <div className='client_header'>
      <h1>{companyAddressField.company}</h1>
    </div>
  );
}

export default ClientHeader;