const mongoose = require('mongoose');

const connectToMongoDB = () => {
    mongoose.connect(
        'mongodb+srv://admin:admin@freecluster.hyuzy.mongodb.net/mongoose-reference?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('connection success');
    });
};

module.exports = connectToMongoDB;
