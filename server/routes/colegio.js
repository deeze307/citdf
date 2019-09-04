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

app.get('/mision-y-vision', (req, res, next) => {
  console.log("Params:",req.query);
  wp.pages().slug('mision-y-vision').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/autoridades', (req, res, next) => {
  wp.pages().slug('autoridades').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/deberes-y-atribuciones', (req, res, next) => {
  wp.pages().slug('deberes-y-atribuciones').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/actas', (req, res, next) => {
  let actas_consejo = [];
  wp.pages().slug('actas-asambleas-ordinarias').then(function(actas_asambleas){
    wp.pages().slug('actas-del-consejo-superior').then(function(actas_consejo){
      actas_asambleas = actas_asambleas[0];
      actas_consejo = actas_consejo[0];
      let response = [actas_asambleas,actas_consejo];
      return res.status(200).json({info: response});
    }).catch(function(err){
      return res.status(400).json({error : err});
    });
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});


module.exports = app;