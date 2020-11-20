const express = require('express');
var cors = require('cors');
require('dotenv').config({path: __dirname + '/.env'})
// const mdAuthentication = require('../middlewares/authentication');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
const WPAPI = require('wpapi');
const wp = new WPAPI({
  endpoint:process.env.CITDF_WPAPI
})
const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
  // Obtengo Categoria de Bolsa de Trabajo
  var novedades;
  console.log("Params:",req.query);
  wp.categories().search('novedades').then(function(response){
    novedades = response;
    console.log("Novedades ID: ",novedades[0].id);
    wp.posts().perPage(req.query.perPage).categories(novedades[0].id).then(function(response){
      return res.status(200).json({info: response});
    }).catch(function(err){
      return res.status(400).json({error : err});
    });
  })
  
});

module.exports = app;