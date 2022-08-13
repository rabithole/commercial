const express = require('express');
const Employee = require('../db/models/employees_model.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    Employee.query()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

router.get('/employee/:id', async (req, res) => {
    let id = req.params.id;

    await Employee.query().findOne({ id: id })
    .then(data => {
            res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({ message: 'Internal Server Error:' + error })
    })
})

// Deletes employee
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    console.log('ID', id)

    await Employee.query().deleteById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({message: 'Internal Server Error:' + error })
        })
})

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