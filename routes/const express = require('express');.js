const express = require('express');
const Credentials = require('../db/models/credentials.js');

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => { 
    if(req.body.first_name == ''){
        console.log('undefined')
    } else {
        await Employee.query().insert(req.body)
            .then(data => {
                console.log('Response Body', res.body)
                res.status(200).json(data);
            })
            .catch(error => {
                console.log('Response Body', res.body)
                res.status(500).json({ message: 'Internal Server Error'});
            })
    }

    
})

module.exports = router;