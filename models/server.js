require('dotenv').config();
const express = require('express')
var cors = require('cors')
class Server {
  constructor() {
    this.app = express();
    this.PORT=process.env.PORT;
    this.usuariosPath='/api/usuarios'
    //middlewares
    this.middlewares();

    //rutas de app
    this.routes();
  }
  middlewares(){
    //DIRECTORIO PÚBLICO
    this.app.use(express.static('public'));

    //CORS
    this.app.use(cors());

    //Pareso y lectura de body
    this.app.use(express.json())
  }
  routes() {
    this.app.use(this.usuariosPath,require('../routes/user'));
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log('servidor', this.PORT);
    })
  }
}

module.exports = Server;