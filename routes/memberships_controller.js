const express = require('express');
const Memberships = require('../db/models/memberships_model.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    Memberships.query()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

router.post('/', async (req, res) => {
    console.log('Request body', req.body)

    await Memberships.query()
    .insert(req.body)
    .then(data => {
        console.log('Response Body', res.body)
        res.status(200).json(data);
    })
    .catch(error => {
        console.log('Response Body', res.body)
        res.status(500).json({ message: 'Internal Server Error'});
    })
})

module.exports = router;