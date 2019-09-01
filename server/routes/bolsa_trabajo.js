const express = require('express');
var cors = require('cors');
const dot_env = require('dotenv').config();
// const mdAuthentication = require('../middlewares/authentication');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
const WPAPI = require('wpapi');
const wp = new WPAPI({
  endpoint:dot_env.parsed.CITDF_WPAPI
})
const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
  // Obtengo Categoria de Bolsa de Trabajo
  var bolsa;
  console.log("Params:",req.query);
  wp.categories().search('bolsa-de-trabajo').then(function(response){
    bolsa = response;
    wp.posts().perPage(req.query.perPage).categories(bolsa[0].id).then(function(response){
      return res.status(200).json({info: response});
    }).catch(function(err){
      return res.status(400).json({error : err});
    });
  })
  
});

module.exports = app;