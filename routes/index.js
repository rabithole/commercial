const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(router.stack
        .filter(r => r.route) 
        .map(r => r.route.path))
})

module.exports = router;
