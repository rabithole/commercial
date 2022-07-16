const express = require('express');
const Orders = require('../db/models/orders_model.js');

const router = express.Router();

router.use(express.json());

router.get('/test', (req, res) => {
 res.status(200).json({ server: 'You found the companies controller'})
});

// router.get('/companies', async (req, res, next) => {
//     // const { id, name } = req.params;
//     const company = await Orders.query().select('id', 'name', 'cost_plus', 'street', 'city', 'state', 'zip', 'annual_revenue');
//     console.log('Name:', company);
//     res.json(company);
// })

router.get('/', (req, res) => {
    Orders.query()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

module.exports = router;