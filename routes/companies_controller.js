const express = require('express');
const Company = require('../db/models/companies_model.js');

const router = express.Router();

router.use(express.json());

router.get('/employees', (req, res) => {
    console.log('List of employees does not exist')
    Company.query().withGraphFetched('employees')
        .then(company => {
            console.log('Company', company)
            res.json({ company });
        })
})

// Full list of companies
router.get('/', (req, res) => {
    console.log('Companies here')
    Company.query()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error:' + error })
    });
})

// Grab single company from companies page
router.get('/company/:id', async (req, res) => {
    let id = req.params.id;

    await Company.query().findOne({ id: id })
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
    await Company.query().insert(req.body)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
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