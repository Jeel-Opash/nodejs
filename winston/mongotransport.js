const mongoose = require('mongoose');
const Transport = require('winston-transport');

const logSchema = new mongoose.Schema({
    level: String,
    message: String,
    timestamp: Date,
    metadata: Object
}, { collection: 'logs' });

class Mongotransport extends Transport {
    constructor(opts) {
        super(opts);

        const connectionString = 'mongodb://localhost:27017/winston2';

        this.connection = mongoose.createConnection(connectionString);

        this.connection.on('error', (err) => {
            console.error('MongoDB Logging Connection error:', err);
        });

        this.LogModel = this.connection.model('Log', logSchema);
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        const { level, message, timestamp, ...metadata } = info;

        this.LogModel.create({
            level,
            message,
            timestamp: timestamp ? new Date(timestamp) : new Date(),
            metadata
        }).then(() => {
            callback();
        }).catch((err) => {
            console.error('Error saving log to MongoDB:', err);
            callback();
        });
    }
}

module.exports = Mongotransport;