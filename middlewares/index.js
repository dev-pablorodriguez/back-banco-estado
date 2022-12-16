//used only for intellisense
const { request, response } = require('express');

const { validationResult } = require('express-validator')

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

module.exports = {
    mdlFieldValidator
}