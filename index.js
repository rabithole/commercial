const express = require('express');
const router = require('./routes');

const server = express();

server.use(express.json());
server.use(router);

server.use('/', router)

// Add .env file later
server.listen(5080, () => console.log('listening - port 5080'));
