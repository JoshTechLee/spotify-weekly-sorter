require('dotenv').config();
const express = require('express');
const connectToMongoDB = require('./config/mongo');

const app = express();
const port = process.env.PORT;

connectToMongoDB();
app.use('/spotify', require('./routes/spotify/authentication'));

console.log('running on port' + port);
app.listen(port);
