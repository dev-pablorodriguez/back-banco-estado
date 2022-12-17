const { Schema, model } = require('mongoose');

const DestinatarioSchema = Schema({
    rut: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    accountNumber: {
        type: Number,
        required: true
    },
    bank: {
        type: Schema.Types.ObjectId,
        ref: 'Bank',
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    }
})

module.exports = model('Destinatario', DestinatarioSchema);