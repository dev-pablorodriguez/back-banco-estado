//used only for intellisense
const { request, response } = require('express');

const Transferencia = require('../models/Transferencia');
const Destinatario = require('../models/Destinatario');

const getTransferenciasByClientId  = async (req = request, res = response) => {
    try {
        const transferencias = await Transferencia.find({ client: req.uid })
                                                .populate('client', 'rut name')
                                                .populate({
                                                    path: 'destinatario',
                                                    select: 'rut name',
                                                    populate: { path: 'bank', select: 'name' }
                                                });

        res.status(200).json({
            ok: true,
            transferencias
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const createTransferencia  = async (req = request, res = response) => {
    try {
        const { destinatario: destinatarioId } = req.body;

        // //Check if the destinatario exists in the DB
        const destinatario = await Destinatario.exists({ _id: destinatarioId, client: req.uid, deleted: false });

        if(!destinatario){
            return res.status(404).json({
                ok: false,
                msg: 'El destinatario no existe.'
            });
        }

        //Create Transfer
        const transfer = new Transferencia(req.body);
        transfer.client = req.uid;
        transfer.created = new Date();

        await transfer.save()

        res.status(201).json({
            ok: true,
            transfer
        });

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

module.exports = {
    getTransferenciasByClientId,
    createTransferencia
}