const express = require('express');
const Company = require('../db/models/companies_model.js');

const router = express.Router();

router.use(express.json());

// List of companies with employees
router.get('/', (req, res) => {
    // console.log('req, res', req, res)
    Company.query().withGraphFetched('employees')
        .then(company => {
            res.status(200).json(company);
            // console.log(process.env.SECRET_KEY);
        })
        .catch(error => {
            res.status(500).json({message: 'Internal Server Error:' + error
        })
    });
})

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let companyUpdate = req.body;
    // console.log('id from req.params', id, companyUpdate)

    await Company.query()
        .update(companyUpdate)
        .where('id', id)
        .then(data => {
            // console.log('Company data', data)
            res.status(200).json(data)
        })
        .catch(error => {
            console.log('Company edit error')
        })
})

// Grab single company from companies page
router.get('/company/:id', async (req, res) => {
    let id = req.params.id;

    await Company.query().findOne({ id: id }).withGraphFetched('employees')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ message: 'Internal Server Error:' + error })
        })
})


// Add restrictions to making a duplicate company
// Creates new company
router.post('/', async (req, res) => {
    console.log('New Company here', req.body)
    await Company.query().insert(req.body)
    .then(data => {
        console.log(data)
        res.status(200).json(data);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error:' + error })
    });
})

// Deletes a company
router.delete('/:id', async (req, res) => {
    let id = req.params.id;

    await Company.query().deleteById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({message: 'Internal Server Error:' + error })
        })
})

module.exports = router;


// const { id, name } = req.params;
// const company = await Company.query().select('id', 'name', 'cost_plus', 'street', 'city', 'state', 'zip', 'annual_revenue');
// Company.query()
// .then(data => {
//     res.status(200).json(company[id]);
// })
// .catch(error => {
//     res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
// });      