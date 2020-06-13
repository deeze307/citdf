const express = require('express');
var cors = require('cors');
// const fileUpload = require('express-fileupload');
const path = require('path');
var multer = require('multer')
var ftpStorage = require('multer-ftp')
var FTP = require('ftp')
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

var fileName = null

var upload = multer({
  storage: new ftpStorage({
    basepath: '/importador-tramites', // base path for file uploads on the server
    ftp: { 
      host: 'ftp.citdf.org.ar',
      secure: false, // enables FTPS/FTP with TLS
      user: 'admin@documentos.citdf.org.ar',
      password: 'ingTDF.19' },
    destination: function (req, file, options, callback) {
      fileName = file.fieldname + Date.now()+ path.extname(file.originalname);
      callback(null, path.join(options.basepath, fileName)) // custom file destination, file extension is added to the end of the path
    },
    transformFile: function (req, file, callback) {
      callback(null, file.stream)
    }
  })
})


app.post('/tramites',upload.single('file'),(req,res,next) =>{
  console.log("Enviando Trámite (Servidor)")
  if (!req.file) {
    return res.status(500).send({ msg: "file is not found" })
  }
  res.send({
    ok:true,
    file:{
      url:'http://documentos.citdf.org.ar/importador-tramites/'+fileName
    }})

})

module.exports = app;