const express = require('express');
const cors = require('cors');

const router = require('./routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

// Add .env file later
server.listen(5080, () => console.log('listening - port 5080'));
