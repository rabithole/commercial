const express = require('express');
const { val } = require('objection');
const UnitCosts = require('../db/models/unit_costs_model.js');

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
    let costsArray = req.body;      
    checkForRecord(req);
})

function checkForRecord(req){
    let dataArray = req.body;
    for(let i = 0; i < dataArray.length; i++){
        let sku = dataArray[i].sku;
        UnitCosts.query().findOne({sku: sku})
            .then(data => {
                console.log('sku 2', sku)
                if(data == undefined){
                    console.log('undefined')
                    insertUnitCosts(dataArray[i]);
                }else{
                    console.log('data is here')
                    updateUnitCosts(dataArray[i]);
                }                
            })
            .catch(err => {
                console.log('error', err)
            })
    }
}

function insertUnitCosts(array){
    console.log('insert data array', array)
    UnitCosts.query().insert(array)
        .then(data => {
            console.log('data controller', data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error:' + error })
        });
}

function updateUnitCosts(req){
    // console.log('request data', req)
    let sku = req.sku;
    let cost = req.unit_cost;
    console.log('request', req)
    console.log('sku', sku)
    console.log('cost', cost)

    UnitCosts.query()
        .where('sku', sku)
        .update({unit_cost: cost})
        .then(data => {
            console.log('data controller', data)
        })
        .catch(error => {
            console.log(error)
            // res.status(500).json({message: 'Internal Server Error:' + error })
        });
}

module.exports = router;