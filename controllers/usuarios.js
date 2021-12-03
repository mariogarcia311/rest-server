const { response } = require('express')

const usuariosGet = (req, res = response) => {
    const {q, nombre,apikey}=req.query;
    res.json({
        msg: 'get API-controlador',
        nombre
    })
}
const usuariosput = (req, res) => {
    const id=req.params.id
    res.json({
        msg: 'put API-controlador',
        id
    })
}
const usuariosPost = (req, res) => {
    const body = req.body;
    const headers = req.headers;
    res.json({
        msg: 'post API-controlador',
        body,
        headers,
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