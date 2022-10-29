const express = require('express');
const UnitCosts = require('../db/models/unit_costs_model.js');

const router = express.Router();

router.use(express.json());

router.get('/company/:id', async (req, res) => {
    let id = req.params.id;

    await UnitCosts.query().findOne({ id: id }).withGraphFetched('employees')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ message: 'Internal Server Error:' + error })
        })
})

router.post('/', async (req, res) => {
    console.log('New UnitCosts here', req.body)
    await UnitCosts.query().insert(req.body)
    .then(data => {
        console.log(data)
        res.status(200).json(data);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error:' + error })
    });
})

module.exports = router;