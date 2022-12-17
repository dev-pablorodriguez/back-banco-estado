//used only for intellisense
const { request, response } = require('express');

const { cleanRut } = require('../helpers')
const Destinatario = require('../models/Destinatario');
const Bank = require('../models/Bank');

const getDestinatariosByClientId  = async (req = request, res = response) => {
    try {
        const destinatarios = await Destinatario.find({ client: req.uid, deleted: false })
                                                .select('-deleted')//exclude deleted field
                                                .populate('client', 'rut name')
                                                .populate('bank', 'name');

        res.status(200).json({
            ok: true,
            destinatarios
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const createDestinatario  = async (req = request, res = response) => {
    try {
        let { rut } = req.body;
        rut = cleanRut(rut);
        const { bank: bankId } = req.body;

        //Check if the bank exists in the DB
        const bank = await Bank.exists({ _id: bankId });

        if(!bank){
            return res.status(404).json({
                ok: false,
                msg: 'El banco de destino no existe.'
            });
        }

        const destinatario = new Destinatario(req.body);
        destinatario.rut = rut;//use clean rut
        destinatario.client = req.uid;
        destinatario.deleted = false;

        await destinatario.save();

        res.status(201).json({
            ok: true,
            destinatario
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const updateDestinatario = async (req = request, res = response) => {
    try {
        //Un destinatario solo puede ser modificado por el usuario que lo creó
        const destinatario = await Destinatario.findOne({ _id: req.params.id, client: req.uid });

        if(!destinatario){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el destinatario.'
            });
        }

        const { email, phone } = req.body;
        const { ...destinatarioUpd } = destinatario._doc;
        destinatarioUpd.email = email;
        destinatarioUpd.phone = phone;

        const modified = await Destinatario
                                .findByIdAndUpdate(req.params.id, destinatarioUpd, { new: true })//get the updated document
                                .populate('client', 'rut name')
                                .populate('bank', 'name');

        res.json({
            ok: true,
            destinatario: modified
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const deleteDestinatario = async (req = request, res = response) => {
    try {
        //Un destinatario solo puede ser eliminado por el usuario que lo creó
        const destinatario = await Destinatario.findOne({ _id: req.params.id, client: req.uid, deleted: false });

        if(!destinatario){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el destinatario.'
            });
        }

        const logicallyDeleted = await Destinatario
                                    .findByIdAndUpdate(req.params.id, { deleted: true }, { new: true })//get the updated document
                                    .select('-deleted')
                                    .populate('client', 'rut name')
                                    .populate('bank', 'name');

        res.json({
            ok: true,
            destinatario: logicallyDeleted
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

module.exports = {
    getDestinatariosByClientId,
    createDestinatario,
    updateDestinatario,
    deleteDestinatario
}