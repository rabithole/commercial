const express = require('express');
const Company = require('../db/models/companies.js');

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