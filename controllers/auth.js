//used only for intellisense
const { request, response } = require('express');

const authUser = (req = request, res = response) => {
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
    authUser,
    renewToken
}