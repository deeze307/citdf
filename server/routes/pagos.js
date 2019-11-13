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
  let { filter, documento_nro, matriculaNro } = req.query;
  // let limit = +req.query.pageSize || 5;
  // let offset = 0;
  let count = 0;
  let where = {
    [Op.and]: [
      {documento_nro: {
        [Op.like]: documento_nro !== undefined ? `${documento_nro}` : '%%'
        }
      },
      {matriculaNro: {
        [Op.like]: matriculaNro !== undefined ? `${matriculaNro}` : '%%'
        }
      }
    ]
  };
  
  db.pagos.findAndCountAll().then((data) => {
    // let page = +req.query.pageNumber || 0;
    // let pages = Math.ceil(data.count / limit);
    // offset = (page) * limit;
    // count = data.count;
    db.pagos.findAll({
        attributes: ['id','pago_id','description','transaction_amount','documento_nro','matriculaNro','medio_pago','factura_afip','observaciones','createdAt','updatedAt'],
        // limit: limit,
        // offset: offset,
        where: where,
        order: [
          ["createdAt", "Desc"]
        ]
      })
      .then(pagos => {
        res.status(200).json({
          ok: true,
          payload: pagos
        });
      });
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(Sequelize.DatabaseError,function(err) {
    return res.status(400).json({ message: "Error al conectarse a la base de datos",err });
  }).catch(function(err) {
    return res.status(400).json({ message: "Error al recuperar pagos",err });
  });
});

app.put('/:id', (req, res) => {
  console.log(req.body);
  let payment = req.body;
  db.pagos.update({
    pago_id : payment.pago_id,
    description : payment.description,
    transaction_amount : payment.transaction_amount,
    documento_nro : payment.documento_nro,
    matriculaNro : payment.matriculaNro,
    medio_pago : payment.medio_pago,
    observaciones : payment.observaciones
  }, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      res.status(404).json({
        ok: false,
        err: 'El pago no existe'
      });
    } else {
      res.status(200).json({
        ok: true,
        msg: `El pago ha sido actualizado`
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
    matriculaNro : payment.matriculaNro,
    medio_pago : payment.medio_pago,
    observaciones : payment.observaciones
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

app.delete('/:id',(req,res) =>{
  const id = req.params.id;

  db.pagos.destroy({
    where: {id: id}
  })
  .then(deleted =>{
    res.status(200).json({
      ok:true,
      response : deleted
    });
  }).catch(function(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      response : error
    });
  });
})

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
        matriculaNro : response.body.matriculaNro,
        transaction_amount : +response.body.transaction_amount,
        documento_nro : response.body.payer.identification.number,
        medio_pago : 'online',
        observaciones : response.body.observaciones
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

module.exports = app;