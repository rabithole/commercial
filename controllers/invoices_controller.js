const express = require('express');
const Invoices = require('../db/models/invoices_model.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    Invoices.query()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

module.exports = router;