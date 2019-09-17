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
  wp.pages().slug('jornadas-2016-09').then(function(jornadas_2016_09){
    wp.pages().slug('jornadas-2017-06-13').then(function(jornadas_2017_06_13){
      wp.pages().slug('jornadas-2017-06-27').then(function(jornadas_2017_06_27){
        wp.pages().slug('jornadas-2017-09-21').then(function(jornadas_2017_09_21){
          console.log("jornadas 2016-09: ",jornadas_2016_09);
          console.log("jornadas 2017-06-13: ",jornadas_2017_06_13);
          console.log("jornadas 2017-06-27: ",jornadas_2017_06_27);
          console.log("jornadas 2017-09-21: ",jornadas_2017_09_21);
          jornadas_2016_09 = jornadas_2016_09[0];
          jornadas_2017_06_13 = jornadas_2017_06_13[0];
          jornadas_2017_06_27 = jornadas_2017_06_27[0];
          jornadas_2017_09_21 = jornadas_2017_09_21[0];
          let response = [jornadas_2016_09,jornadas_2017_06_13,jornadas_2017_06_27,jornadas_2017_09_21];
          return res.status(200).json({info: response});
        }).catch(function(err){
          return res.status(400).json({error : "Jornadas 2017-09-21:"+err});
        });
      }).catch(function(err){
        return res.status(400).json({error : err});
      });
    }).catch(function(err){
      return res.status(400).json({error : err});
    });
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});


module.exports = app;