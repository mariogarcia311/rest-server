const { response } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validar } = require('../middlewares/validar');
const usuariosGet = (req, res = response) => {
    const { q, nombre, apikey } = req.query;
    res.json({
        msg: 'get API-controlador',
        nombre
    })
}
const usuariosput = (req, res) => {
    const id = req.params.id
    res.json({
        msg: 'put API-controlador',
        id
    })
}
const usuariosPost = async (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contraseña, rol });
    //verificar si el correo existe


    //encriptar la contraseña
    const salt=bcryptjs.genSaltSync();
    usuario.contraseña=bcryptjs.hashSync(contraseña,salt)

    await usuario.save();
    res.json({
        msg: 'post API-controlador',
        usuario
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API-controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosput,
    usuariosPost,
    usuariosDelete,

}