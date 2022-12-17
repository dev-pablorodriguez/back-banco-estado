/*
    Transferencias
    host + /api/transferencias
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { mdlFieldValidator, mdlValidateJwt } = require('../middlewares')

const {
    getTransferenciasByClientId,
    createTransferencia
} = require('../controllers/transferencias')

//Apply middleware to all incoming requests
router.use(mdlValidateJwt);

router.get(
    '/',
    getTransferenciasByClientId
);

router.post(
    '/',
    [
        //middlewares
        check('amount')
            .isInt({ min: 1000 })
            .withMessage('El monto debe ser un valor numérico mayor a 1000.'),
        check('destinatario')
            .notEmpty()
            .withMessage('El destinatario es obligatorio.'),
        mdlFieldValidator
    ],
    createTransferencia
);

module.exports = router;