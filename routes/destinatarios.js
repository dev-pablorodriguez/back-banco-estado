/*
    Destinatarios
    host + /api/destinatarios
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { mdlFieldValidator, mdlValidateJwt } = require('../middlewares')

const {
    getDestinatariosByClientId,
    createDestinatario,
    updateDestinatario,
    deleteDestinatario
} = require('../controllers/destinatarios')

const { validateRut } = require('../helpers')

//Apply middleware to all incoming requests
router.use(mdlValidateJwt);

router.get(
    '/',
    getDestinatariosByClientId
);

router.post(
    '/',
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
        check('email')
            .notEmpty()
            .withMessage('El email es obligatorio.')
            .isEmail()
            .withMessage('El email es incorrecto.'),
        check('phone')
            .notEmpty()
            .withMessage('El teléfono es obligatorio.')
            .isNumeric()
            .withMessage('El teléfono no tiene el formato correcto.')
            .isLength({ min: 9, max: 9 })
            .withMessage('El teléfono debe tener 9 caracteres.'),
        check('accountNumber')
            .notEmpty()
            .withMessage('El número de cuenta es obligatorio.')
            .isNumeric()
            .withMessage('El número de cuenta debe tener 10 caracteres numéricos.')
            .isLength({ min: 10, max: 10 })
            .withMessage('El número de cuenta debe tener 10 caracteres numéricos.'),
        check('bank')
            .notEmpty()
            .withMessage('El banco es obligatorio.'),
        mdlFieldValidator
    ],
    createDestinatario
);

router.put(
    '/:id',
    [
        //middlewares
        check('name')
            .notEmpty()
            .withMessage('El nombre es obligatorio.'),
        check('email')
            .notEmpty()
            .withMessage('El email es obligatorio.')
            .isEmail()
            .withMessage('El email es incorrecto.'),
        check('phone')
            .notEmpty()
            .withMessage('El teléfono es obligatorio.')
            .isNumeric()
            .withMessage('El teléfono no tiene el formato correcto.')
            .isLength({ min: 9, max: 9 })
            .withMessage('El teléfono debe tener 9 caracteres.'),
        check('accountNumber')
            .notEmpty()
            .withMessage('El número de cuenta es obligatorio.')
            .isNumeric()
            .withMessage('El número de cuenta debe tener 10 caracteres numéricos.')
            .isLength({ min: 10, max: 10 })
            .withMessage('El número de cuenta debe tener 10 caracteres numéricos.'),
        check('bank')
            .notEmpty()
            .withMessage('El banco es obligatorio.'),
        mdlFieldValidator
    ],
    updateDestinatario
);

router.delete(
    '/:id',
    deleteDestinatario
);


module.exports = router;