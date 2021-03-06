const express = require('express');
const Company = require('../db/models/companies_model.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    Company.query()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

router.get('/company/:id', async (req, res) => {
    let id = req.params.id;

    let data = await Company.query().findOne({
        id: id
    });
    res.send(data);
})


// Add restrictions to making a duplicate company
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

router.delete('/company/:id', async (req, res) => {
    let id = req.params.id;

    let data = await Company.query().findOne({
        id: id
    });
    res.send(data);
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