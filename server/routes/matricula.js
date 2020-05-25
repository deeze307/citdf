const express = require('express');
const Axios = require('axios');
const CircularJSON = require('circular-json');
var cors = require('cors');
const bcrypt = require('bcryptjs')
const Request = require('request');
const db = require('../models');
require('dotenv').config({path: __dirname + '/.env'})
const Sequelize = require('../models').Sequelize;
const Op = Sequelize.Op;
const mdAuthentication = require('../middlewares/authentication');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
const WPAPI = require('wpapi');
const wp = new WPAPI({
  endpoint:process.env.CITDF_WPAPI
})
// const jwt = require('jsonwebtoken');
// const SEED = require('../config/config').SEED;

const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
  if (req.headers.authorization){
    wp.setHeaders('Authorization',req.headers.authorization);
  }
  wp.users().get(function( err, data ) {
    if ( err ) {
        res.json({error: err});// handle err
    }
    res.json({ info: data })
  });
});


app.get('/como-matricularse', (req, res, next) => {
  wp.pages().slug('como-matricularse').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/baja-suspension', (req, res, next) => {
  wp.pages().slug('baja-suspension').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});


module.exports = app;