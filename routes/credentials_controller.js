const express = require('express');
const Credentials = require('../db/models/credentials.js');

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
    console.log('New Credentials here', req.body)
    await Credentials.query().insert(req.body)
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