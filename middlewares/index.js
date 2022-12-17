//used only for intellisense
const { request, response } = require('express');

const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const mdlFieldValidator = (req = request, res = response, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

const mdlValidateJwt = (req = request, res = response, next) => {
    ///Get Authorization header
    const header = req.header('Authorization');
    const token = header?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario no autenticado.' 
        });
    }

    try {
        //Throws and exception if the token is not valid
        const { uid, name } = jwt.verify(token, process.env.JWT_SEED)

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido.' 
        });
    }

    next();
}

module.exports = {
    mdlFieldValidator,
    mdlValidateJwt
}