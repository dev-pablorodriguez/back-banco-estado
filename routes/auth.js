/*
    Autenticación
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')

const { authUser, renewToken } = require('../controllers/auth')

router.post(
    '/',
    [
        //middlewares
        check('rut', 'El rut es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña es obligatoria.').not().isEmpty(),
        fieldValidator
    ],
    authUser
);

router.get('/renew', renewToken);


module.exports = router;