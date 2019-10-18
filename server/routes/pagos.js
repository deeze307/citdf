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
const WPAPI = require('wpapi');
const wp = new WPAPI({
  endpoint:process.env.CITDF_WPAPI
})
const app = express();

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

mercadopago.configure({
  client_id:"2144863141546388",
  client_secret:"uYcpcWYGJylihGs0jxKRJTxs0KiAVNqR"  
});

app.use(cors());

app.get('/', (req, res, next) => {
  // Obtengo Todos los tramites
  console.log(req.query);
  let { filter } = req.query;
  let limit = +req.query.pageSize || 5;
  let offset = 0;
  let count = 0;
  // let where = {
  //   [Op.and]: [
  //     {id: {
  //       [Op.like]: id !== undefined ? `${id}` : '%%'
  //       }
  //     },
  //     {userId: {
  //       [Op.like]: userId !== undefined ? `${userId}` : '%%'
  //       }
  //     },
  //     {tramite: {
  //       [Op.like]: tramite !== undefined ? `${tramite}` : '%%'
  //       }
  //     },
  //     {status: {
  //       [Op.like]: status !== undefined ? `${status}` : '%%'
  //       }
  //     },
  //     {documentoNro: {
  //       [Op.like]: documentoNro !== undefined ? `${documentoNro}` : '%%'
  //       }
  //     }
  //   ]
  // };
  
  db.pagos.findAndCountAll().then((data) => {
    let page = +req.query.pageNumber || 0;
    let pages = Math.ceil(data.count / limit);
    offset = (page) * limit;
    count = data.count;
    db.pagos.findAll({
        attributes: ['id','pago_id','description','transaction_amount','documento_nro','medio_pago','factura_afip','createdAt','updatedAt'],
        limit: limit,
        offset: offset,
        // where: where,
        order: [
          ["createdAt", "Desc"]
        ]
      })
      .then(pagos => {
        res.status(200).json({
          ok: true,
          payload: pagos,
          count: count,
          pages: pages
        });
      });
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(function(err) {
    return res.status(400).json({ message: "Error al recuperar los pagos",err });
  });
});

app.put('/:id', (req, res) => {
  console.log(req.body);
  switch(req.body.status){
    case "Pendiente" : req.body.status = 0;
    case "En Proceso" : req.body.status = 1;
    case "Completado" : req.body.status = 2;
    case "Cancelado" : req.body.status = 3;
  }

  db.tramites.update({
    userId: req.body.userId,
    documentoNro : req.body.documentoNro,
    valor : req.body.valor,
    tramite: req.body.tramite,
    nota: req.body.nota,
    status: req.body.status
  }, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      res.status(404).json({
        ok: false,
        err: 'El tramite no existe'
      });
    } else {
      res.status(200).json({
        ok: true,
        msg: `El tramite ha sido actualizado`
      });
    }
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(function(err) {
    return res.status(400).json({ message: "issues trying to connect to database" });
  });
});

// Pagos con MercadoPago  
app.post('/create',(req,res,next) =>{
  // Agrega credenciales
  
  let payment = req.body;
  console.log("Req:",payment);

  // Primero genero el pago en mercadopago
  mercadopago.payment.create(payment)
  .then(function(response){
    if(response.body.id){
      // si fué exitoso, genero el registro de vinculación
      db.pagos.create({
        pago_id : response.body.id,
        description : response.body.description,
        transaction_amount : +response.body.transaction_amount,
        documento_nro : response.body.payer.identification.number,
        medio_pago : 'online'
      }).then(result =>{
      })
    }
    res.status(200).json({
      ok:true,
      response : response
    });
    
  }).catch(function(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      response : error
    });
  });
})

app.post('/register',(req,res,next) =>{
  // Agrega credenciales
  
  let payment = req.body;
  console.log("Req:",payment);

  // si fué exitoso, genero el registro de vinculación
  db.pagos.create({
    pago_id : payment.pago_id,
    description : payment.description,
    transaction_amount : payment.transaction_amount,
    documento_nro : payment.documento_nro,
    medio_pago : payment.medio_pago
  }).then(result =>{
    res.status(200).json({
      ok:true,
      response : result
    });
  }).catch(function(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      response : error
    });
  });
})

module.exports = app;