const express = require('express');
const Company = require('../db/models/companies_model.js');

const router = express.Router();

router.use(express.json());

// router.get('/:id', async (req, res, next) => {
//     const { id, name } = req.params;
//     const company = await Company.query().select('id', 'name', 'cost_plus', 'street', 'city', 'state', 'zip', 'annual_revenue');
//     console.log('Name:', company);
//     res.json(company[id]);
// })

router.get('/', (req, res) => {
    Company.query()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

router.get('/:name', async (req, res) => {
    const { id, name } = req.params;
    const company = await Company.query().select('id', 'name', 'cost_plus', 'street', 'city', 'state', 'zip', 'annual_revenue');
    Company.query()
    .then(data => {
        res.status(200).json(company[id]);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

router.post('/', (req, res) => {
    console.log(req.body)
    Company.query().insert(req.body)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

module.exports = router;