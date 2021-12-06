const { model } = require('mongoose');
const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en bd`)
    }
}
const emailExiste = async (correo = '') => {
    const existeEmail = await usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error (`El correo ${correo} ya existe`)
    }
}
const usarioIDExiste = async (id ) => {
    const existeUser = await usuario.findById( id )
    console.log(existeUser)
    if (!existeUser) {
        throw new Error (`El ID ${id } no existe`)
    }
}
module.exports = {
    esRolValido,
    emailExiste,
    usarioIDExiste,
}