require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./config/mongo');

const app = express();
const port = process.env.PORT;

connectToMongoDB();
app.use(cors());
app.use(express.json());
app.use('/spotify', require('./routes/spotify/authentication'));

console.log('running on port' + port);
app.listen(port);
