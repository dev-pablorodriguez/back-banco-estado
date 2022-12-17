/*
    Autenticación
    host + /api/banks
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { mdlFieldValidator } = require('../middlewares')

const { getBanks, createBank, deleteBank } = require('../controllers/banks')

router.get(
    '/',
    getBanks
);

router.post(
    '/',
    [
        //middlewares
        check('name')
            .notEmpty()
            .withMessage('El nombre del banco es obligatorio.')
            .isLength({ min: 3 })
            .withMessage('El nombre del banco debe tener mínimo 3 caracteres.'),
        mdlFieldValidator
    ],
    createBank
);

router.delete(
    '/:id',
    deleteBank
);

module.exports = router;