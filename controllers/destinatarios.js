//used only for intellisense
const { request, response } = require('express');

const { cleanRut } = require('../helpers')
const Destinatario = require('../models/Destinatario');

const getDestinatariosByClientId  = async (req = request, res = response) => {
    try {
        const destinatarios = await Destinatario.find({ client: req.uid })
                                                .populate('client', 'rut name');

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

        const destinatario = new Destinatario(req.body);
        destinatario.rut = rut;//use clean rut
        destinatario.client = req.uid;

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

        //Remove properties that cannot be modified
        const { _id, rut, client, __v, ...destinatarioUpd } = req.body;

        const modified = await Destinatario
                                .findByIdAndUpdate(req.params.id, destinatarioUpd, { new: true })//get the updated document
                                .populate('client', 'rut name');

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
        const destinatario = await Destinatario.findOne({ _id: req.params.id, client: req.uid });

        if(!destinatario){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el destinatario.'
            });
        }

        const deleted = await Destinatario
                                .findByIdAndDelete(req.params.id)
                                .populate('client', 'rut name');

        res.json({
            ok: true,
            destinatario: deleted
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