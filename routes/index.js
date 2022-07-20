const express = require('express');
// const Company = require('../db/models/companies_model');
const companyController = require('../controllers/companies_controller');
const employeesController = require('../controllers/employees_controller');
const invoicesController = require('../controllers/invoices_controller');
const membershipsController = require('../controllers/memberships_controller');
const orderLineItemsController = require('../controllers/order_line_items_controller');
const ordersController = require('../controllers/orders_controller');

const router = express();

router.use(express.json());

router.use('/companies', companyController);
router.use('/employees', employeesController);
router.use('/invoices', invoicesController);
router.use('/memberships', membershipsController);
router.use('/orderLineItems', orderLineItemsController);
router.use('/orders', ordersController);

router.get('/', (request, response) => {
    response.status(200).json({ server: 'Is Running'})
});

module.exports = router;

