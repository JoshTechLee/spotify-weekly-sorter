require('dotenv').config();
const express = require('express');
const connectToMongoDB = require('./config/mongoose');

const app = express();
const port = process.env.PORT;

connectToMongoDB();
app.use('/spotify', require('./routes/spotify'));

console.log('running on port' + port);
app.listen(port);
