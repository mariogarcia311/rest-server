const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {
    const { correo, contraseña } = req.body;
    try {
        //verificar email
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'usuario/password no es correcto'
            })
        }
        //verificar sie stá activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'usuario/password no es correcto-estado false'
            })
        }
        //verificar contraseña
        const validPassword=bcryptjs.compareSync(contraseña,usuario.contraseña)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'usuario/password no es correcto-contraseña'
            })
        }
        const token=await generarJWT(usuario.id);
        res.json({
            msg: 'login ok',
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'comuniquese con el admin'
        })
    }

}

module.exports = {
    login,
}