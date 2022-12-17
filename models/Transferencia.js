const { Schema, model } = require('mongoose');

const TransferenciaSchema = Schema({
    amount: {
        type: Number,
        required: true,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'Destinatario',
        required: true
    },
    created: {
        type: Date,
        required: true
    }
})

module.exports = model('Transferencia', TransferenciaSchema);