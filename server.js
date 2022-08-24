require('dotenv').config();
const express = require('express');
const cors = require('cors');

const host = 'http://localhost';
const port = process.env.PORT || 5080;

const router = require('./routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

server.listen(port, () => console.log(`server running at ${host}:${port}`));
