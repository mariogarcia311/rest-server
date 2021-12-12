const { response } = require("express");

const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'se verifica el rol sin validar token'
        })
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'no es administrador'
        })
    }
    next();
}

const tieneRole = (...roles) => {
    return(req, res = response, next)=>{
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'se verifica el rol sin validar token'
            })
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(500).json({
                msg: `el usuario no cuenta con el rol como este ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}