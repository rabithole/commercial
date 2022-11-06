require('dotenv').config();
const express = require('express');
const cors = require('cors');

const host = process.env.HOST;
const port = process.env.PORT;

const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json({limit: "100mb", extended: true}));
app.use(express.urlencoded({limit: "100mb", extended: true, parameterLimit: 50000}));
app.use(router);

app.listen(port, () => console.log(`app running at localhost:${port}`));