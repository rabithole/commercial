const express = require('express');
const UnitCosts = require('../db/models/unit_costs_model.js');
const Employee = require('../db/models/unit_costs_model.js');

const router = express.Router();

router.use(express.json());

router.get('/:sku', async (req, res) => {
    let sku = req.params.sku;
    console.log('sku', sku)
    console.log('Yesssss, you found the controller')

    await UnitCosts.query().findOne({ sku: sku })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({ message: 'Internal Server Error:' + error })
    })
})

module.exports = router;