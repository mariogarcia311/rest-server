require('dotenv').config();
const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
  constructor() {
    this.app = express();
    this.PORT=process.env.PORT;
    this.usuariosPath='/api/usuarios'
    this.authPath='/api/auth'

    //conectar base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();

    //rutas de app
    this.routes();
  }
  async conectarDB(){
    await dbConnection();
  }
  middlewares(){
    //DIRECTORIO PÚBLICO
    this.app.use(express.static('public'));

    //CORS
    this.app.use(cors());

    //Parseo y lectura de body
    this.app.use(express.json())
  }
  routes() {
    this.app.use(this.authPath,require('../routes/auth'));

    this.app.use(this.usuariosPath,require('../routes/user'));
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log('servidor', this.PORT);
    })
  }
}

module.exports = Server;