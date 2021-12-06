const { response } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validar } = require('../middlewares/validar');
const { countDocuments } = require('../models/usuario');
const usuariosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde))
    // const total = await Usuario.countDocuments({ estado: true })
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .limit(Number(limite))
            .skip(Number(desde))
    ])
    res.json({
        total,
        usuarios,
    })
}
const usuariosput = async (req, res) => {
    const id = req.params.id
    const { _id, contraseña, google, correo, ...resto } = req.body;

    //todo validar contra base de datos

    if (contraseña) {
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
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
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña, salt)

    await usuario.save();
    res.json({
        msg: 'post API-controlador',
        usuario
    })
}
const usuariosDelete = async(req, res) => {
    const {id}=req.params;
    //borrar físicamente
    // const usuario=await Usuario.findByIdAndDelete(id)
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosput,
    usuariosPost,
    usuariosDelete,

}