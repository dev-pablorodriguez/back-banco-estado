//used only for intellisense
const { request, response } = require('express');

const { encryptPassword, validatePassword, generateJwt } = require('../helpers')
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
            msg: 'Error interno del sistema.'
        })
    }
}

const authClient = async (req = request, res = response) => {
    try {
        let { rut } = req.body;
        rut = rut.replaceAll('.', '');

        const { password } = req.body;

        let client = await Client.findOne({ rut });
        
        if(!client){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas.'
            });
        }

        const isValidPassword = validatePassword(password, client.password)

        if(!isValidPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas.'
            });
        }

        //Generate JWT
        const token = await generateJwt(client._id, client.name);

        res.status(200).json({
            ok: true,
            uid: client._id,
            name: client.name,
            token
        })

        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const refreshToken = async (req = request, res = response) => {
    //Generate JWT
    const token = await generateJwt(req.uid, req.name);

    res.json({ ok: true, token })
}

module.exports = {
    newClient,
    authClient,
    refreshToken
}