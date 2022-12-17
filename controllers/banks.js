//used only for intellisense
const { request, response } = require('express');

const Bank = require('../models/Bank');

const getBanks  = async (req = request, res = response) => {
    try {
        const banks = await Bank.find();

        res.status(200).json({
            ok: true,
            banks
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const createBank  = async (req = request, res = response) => {
    try {
        const bank = new Bank(req.body);

        await bank.save();

        res.status(201).json({
            ok: true,
            bank
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const deleteBank = async (req = request, res = response) => {
    try {
        const bank = await Bank.findById(req.params.id);

        if(!bank){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el banco.'
            });
        }

        const deleted = await Bank.findByIdAndDelete(req.params.id)

        res.json({
            ok: true,
            bank: deleted
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
    getBanks,
    createBank,
    deleteBank
}