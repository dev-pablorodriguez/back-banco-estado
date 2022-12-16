const { Schema, model } = require('mongoose');

const ClientSchema = Schema({
    rut: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = model('Client', ClientSchema);