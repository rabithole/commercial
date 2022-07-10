const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(router.stack
        .filter(r => r.route) 
        .map(r => r.route.path))
})

router.get('/routes', (req, res) => {
 res.status(200).json({ server: 'You found the routes directory'})
});

module.exports = router;

