const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);

app.use('/routes', router)

app.listen(5080, () => console.log('server listening on port 5080'));

// app.get('/', (req, res) => {
// 	res.status(200).json({ server: 'Is Running!'})
// });

// module.exports = app;