const  validar  = require('../middlewares/validar');
const  validarjwt  = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');

module.exports={
    ...validar, ...validarjwt, ...validarRoles
}