const express = require('express');
var cors = require('cors');
require('dotenv').config({path: __dirname + '/.env'})
const db = require('../models');
const Sequelize = require('../models').Sequelize;
const Op = Sequelize.Op;
// const mdAuthentication = require('../middlewares/authentication');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
  // Obtengo Todos los sliders
  console.log(req.query);
  
  db.slider_img.findAll({
    attributes: ['id','display_name','url'],
    where: {
      enabled: 1
    }
  })
  .then(slider => {
    res.status(200).json({
      ok: true,
      payload: slider
    });
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(Sequelize.DatabaseError,function(err) {
    return res.status(400).json({ message: "Error al conectarse a la base de datos",err });
  }).catch(function(err) {
    return res.status(400).json({ message: "Error al recuperar slider",err });
  });
});


module.exports = app;