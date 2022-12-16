//used only for intellisense
const { request, response } = require('express');

const { encryptPassword } = require('../helpers')
const Client = require('../models/Client');

const newClient  = async (req = request, res = response) => {
    try {
        let { rut } = req.body;
        rut = rut.replaceAll('.', '');

        const { name, password } = req.body;

        let client = await Client.findOne({ rut });
        
        //Si existe un cliente registrado con ese RUT
        if(client){
            return res.status(400).json({
                ok: false,
                msg: 'El RUT ingresado ya se encuentra registrado.'
            });
        }

        client = new Client({ rut, name, password });
        client.password = encryptPassword(password);

        await client.save();

        res.status(201).json({
            ok: true,
            uid: client._id,
            name: client.name
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error al crear registro.'
        })
    }
}

const authClient = (req = request, res = response) => {
    const { rut, password } = req.body;

    res.json({
        ok: true,
        msg: 'Autenticación',
        rut,
        password
    })
}

const renewToken = (req = request, res = response) => {
    res.json({ ok: true })
}

module.exports = {
    newClient,
    authClient,
    renewToken
}