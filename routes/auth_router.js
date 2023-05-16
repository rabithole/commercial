const express = require('express');
const Credentials = require('../db/models/credentials.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Users = require('../users/users-model');

console.log('auth router')

const router = express.Router();

router.use(express.json());

router.post('/register', async (req, res) => {
    console.log('register end point reached')
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    await Credentials.query().insert(req.body)
    .then(data => {
        console.log(data)
        const token = genToken(user, data.id);
        console.log(data)
        res.status(201).json({message: `Registration successful ${user.username}!`, token: token });
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user, user.id);
            res.status(202).json({message: `Welcome ${user.username}!`, token})
        } else {
            res.status(401).json({message: 'Invalid username or password'});
        }        
    })
    .catch(error => {
        res.status(500).json({message: 'Internal Server Error, Error Returned: ' + error })
    })
})

function genToken(user, id) {
    const payload = {
        userid: id,
        username: user.username,
    };

    const options = {
        expiresIn: '1h'};
    const secret = process.env.JWTSECRET;
    const token = jwt.sign(payload, secret, options);

    return token;
}

module.exports = router;