
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validar } = require('../middlewares/validar');
const router = Router();


router.post('/login',[
    check('correo','el correo es obligatorio').isEmail().not().isEmpty(),
    check('contraseña','la contraseña es obligatoria').not().isEmpty(),
    validar

],login)
module.exports = router;