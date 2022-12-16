/*
    Autenticación
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { mdlFieldValidator, mdlValidateJwt } = require('../middlewares')

const { newClient, authClient, refreshToken } = require('../controllers/auth')

const { validateRut } = require('../helpers')

router.post(
    '/register',
    [
        //middlewares
        check('rut')
            .notEmpty()
            .withMessage('El rut es obligatorio.')
            .custom(value => validateRut(value))
            .withMessage('El rut ingresado no es válido.'),
        check('name')
            .notEmpty()
            .withMessage('El nombre es obligatorio.'),
        check('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria.')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe contener mínimo 6 caracteres.'),
        mdlFieldValidator
    ],
    newClient
);

router.post(
    '/',
    [
        //middlewares
        check('rut')
            .notEmpty()
            .withMessage('El rut es obligatorio.'),
        check('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria.'),
        mdlFieldValidator
    ],
    authClient
);

router.get('/refresh', mdlValidateJwt, refreshToken);


module.exports = router;