import axios from 'axios';

function getUnitCosts(){
    axios
      .post('http://localhost:5080/shopify_get_all_unit_costs')
      .then((response) => {
        console.log('Inventory Items response', response)
      })
  }

export default getUnitCosts;