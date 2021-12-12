
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosput, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, usarioIDExiste } = require('../helpers/db-validators');

// const { validar } = require('../middlewares/validar');
// const { validarjwt } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {validar, validarjwt, esAdminRole, tieneRole}=require('../middlewares')
const router = Router();

router.get('/', usuariosGet)
router.put('/:id', [
    check('id','no es un ID válido').isMongoId(),
    check('id').custom(usarioIDExiste),
    check('rol').custom(esRolValido),
    validar
],usuariosput)
router.post('/',[
    check('correo','El correo no es válido').isEmail(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('contraseña','El contraseña debe ser de más de 6 caracteres').isLength({min:6}),
    // check('rol','No es un rol Permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validar
], usuariosPost)
router.delete('/:id',
[
    validarjwt,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','no es un ID válido').isMongoId(),
    check('id').custom(usarioIDExiste),
    validar
] ,usuariosDelete)
module.exports = router;