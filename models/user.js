const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const streamSchema = new Schema({
    url: { type: String, required: true }
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    streams: [streamSchema]
});

module.exports = mongoose.model('User', userSchema);