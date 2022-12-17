const { Schema, model } = require('mongoose');

const ClientSchema = Schema({
    rut: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('Client', ClientSchema);