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

app.get('/codigo-de-etica', (req, res, next) => {
  wp.pages().slug('codigo-de-etica').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/ley-de-creacion', (req, res, next) => {
  wp.pages().slug('ley-de-creacion').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/reglamento-interno', (req, res, next) => {
  wp.pages().slug('reglamento-interno').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/reglamento-electoral', (req, res, next) => {
  wp.pages().slug('reglamento-electoral').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});


module.exports = app;