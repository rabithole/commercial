const express = require('express');
const Company = require('../db/models/companies_model');
// const { address } = require('../db/models/companies_model');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(router.stack
        .filter(r => r.route) 
        .map(r => r.route.path))
})

router.get('/routes', (req, res) => {
 res.status(200).json({ server: 'You found the routes directory'})
});

router.get('/companies', async (req, res, next) => {
    // const { id, name } = req.params;
    const company = await Company.query().select('id', 'name', 'cost_plus', 'street', 'city', 'state', 'zip', 'annual_revenue');
    console.log('Name:', company);
    res.json(company);
})

module.exports = router;

