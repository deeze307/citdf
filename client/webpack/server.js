var express = require('express');
var app = express();

app.use(express.static('dist'));

app.listen(9001, function () {
  console.log('Server listening!');
  console.log("SIEP_API_GW_INGRESS",process.env.SIEP_API_GW_INGRESS);
});
