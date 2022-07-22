const express = require('express');
const OrderLineItems = require('../db/models/order_line_items_model.js');

const router = express.Router();

router.use(express.json());

router.get('/test', (req, res) => {
 res.status(200).json({ server: 'You found the companies controller'})
});

// router.get('/companies', async (req, res, next) => {
//     // const { id, name } = req.params;
//     const company = await OrderLineItems.query().select('id', 'name', 'cost_plus', 'street', 'city', 'state', 'zip', 'annual_revenue');
//     console.log('Name:', company);
//     res.json(company);
// })

router.get('/', (req, res) => {
    OrderLineItems.query()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    });
})

module.exports = router;