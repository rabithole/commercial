const express = require('express');
// const Company = require('../db/models/companies_model');
const companyController = require('./companies_controller');
const employeesController = require('./employees_controller');
const invoicesController = require('./invoices_controller');
const membershipsController = require('./memberships_controller');
const orderLineItemsController = require('./order_line_items_controller');
const ordersController = require('./orders_controller');

const router = express();

router.use(express.json());

router.use('/companies', companyController);
router.use('/employees', employeesController);
router.use('/invoices', invoicesController);
router.use('/memberships', membershipsController);
router.use('/order_Line_Items', orderLineItemsController);
router.use('/orders', ordersController);

router.get('/', (request, response) => {
    response.status(200).json({ server: 'Is Running'});
    console.log('Found index.js')
});

module.exports = router;

