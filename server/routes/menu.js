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
  wp.url(dot_env.parsed.CITDF_WPAPI+'/wp-api-menus/v2/menus/2')
  .then(function(response){
    // if ( err ) {
    //   return res.status(400).json({error: err});// handle err
    // }
    return res.json({ info: response })
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

module.exports = app;