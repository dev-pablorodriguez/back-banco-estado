const { Schema, model } = require('mongoose');

const BankSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = model('Bank', BankSchema);