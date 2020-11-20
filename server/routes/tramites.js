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

app.use(cors());

app.get('/legajo-minimo', (req, res, next) => {
  console.log("Params:",req.query);
  wp.pages().slug('legajo-minimo').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/certificacion-de-firma', (req, res, next) => {
  console.log("Params:",req.query);
  wp.pages().slug('certificacion-de-firma').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/encomienda-de-tareas', (req, res, next) => {
  console.log("Params:",req.query);
  wp.pages().slug('encomienda-de-tareas').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
  });
});

app.get('/', (req, res, next) => {
  // Obtengo Todos los tramites
  let { filter, id, userId, tramite, status, documentoNro, ciudadTramite, matriculaNro, incremental, sortField, sortDirection } = req.query;
  // let limit = +req.query.pageSize || 5;
  let offset = 0;
  let count = 0;
  let where = {
    [Op.and]: [
      {id: {
        [Op.like]: id ? `${id}` : '%%'
        }
      },
      {userId: {
        [Op.like]: userId ? `${userId}` : '%%'
        }
      },
      {tramite: {
        [Op.like]: tramite ? `${tramite}` : '%%'
        }
      },
      {status: {
        [Op.like]: status ? `${status}` : '%%'
        }
      },
      {documentoNro: {
        [Op.like]: documentoNro ? `${documentoNro}` : '%%'
        }
      },
      {matriculaNro: {
        [Op.like]: matriculaNro ? `${matriculaNro}` : '%%'
        }
      },
      {ciudadTramite: {
        [Op.like]: matriculaNro ? `${matriculaNro}` : '%%'
        }
      }
    ]
  };
  
  db.tramites.findAndCountAll().then((data) => {
    // let page = +req.query.pageNumber || 0;
    // let pages = Math.ceil(data.count / limit);
    // offset = (page) * limit;
    // count = data.count;
    db.tramites.findAll({
        attributes: ['id','userId','tramite','nota','documentoNro', 'matriculaNro','ciudadTramite', 'nroRegistro', 'incremental', 'valor','status','observaciones','docFileUrl','createdAt','updatedAt'],
        // limit: limit,
        // offset: offset,
        where: where,
        order: [
          ["createdAt", "Desc"]
        ]
      })
      .then(tramites => {
        res.status(200).json({
          ok: true,
          payload: tramites
        });
      });
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(Sequelize.DatabaseError,function(err) {
    return res.status(400).json({ message: "Error al conectarse a la base de datos",err });
  }).catch(function(err) {
    return res.status(400).json({ message: "Error al recuperar los trámites",err });
  });
});

app.put('/:id', (req, res) => {
  console.log(req.body);
  switch(req.body.status){
    case "Revisión Pendiente" : req.body.status = 0;
    case "En Proceso" : req.body.status = 1;
    case "Completado" : req.body.status = 2;
    case "Rechazado" : req.body.status = 3;
    case "Aprobación Pendiente" : req.body.status = 4;
    case "Pago Pendiente" : req.body.status = 5;
  }

  db.tramites.update({
    userId: req.body.userId,
    documentoNro : req.body.documentoNro,
    matriculaNro : req.body.matriculaNro,
    // nroRegistro : req.body.nroRegistro, // esto se genera automáticamente y no se modifica
    valor : req.body.valor,
    tramite: req.body.tramite,
    nota: req.body.nota,
    observaciones : req.body.observaciones,
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
        tramite: result,
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

app.put('/documento/:id', (req, res) => {
  console.log("Body paa actualizar",req.body.url)
  db.tramites.update({
    docFileUrl: req.body.url
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



app.post('/',(req,res,next) =>{
  // obtengo el último nro de registro generado para una ciudad y un tipo determinado
  let _tramite = req.body.tramite
  let ciudadTramite = req.body.ciudadTramite

  let registroWhere = {
    [Op.and]: [
      {
        tramite: _tramite
      },
      {
        ciudadTramite: ciudadTramite
      }
    ]
  };

  db.tramites.findOne({
    attributes: ['id','nroRegistro','incremental','createdAt','updatedAt'],
    where: registroWhere,
    order: [
      ["createdAt", "Desc"]
    ]
  })
  .then(registroNro => {
    _tramite =_tramite.substring(0,1)
    ciudadTramite = ciudadTramite === "Ushuaia" ? "USH" : "RG"
    if (!registroNro) {
      registroNro = { incremental: 0 }
    }
    
    let nroRegistro = `${_tramite}${(++registroNro.incremental)}${ciudadTramite}`
    console.log('nroRegistro', nroRegistro, req.body)

    db.tramites.create({
      userId: req.body.matriculado.ID,
      documentoNro : req.body.matriculado.documento_nro,
      matriculaNro: req.body.matriculado.matricula,
      ciudadTramite: req.body.ciudadTramite,
      nroRegistro: nroRegistro, // auto generado
      incremental: registroNro.incremental,
      valor : req.body.valor,
      tramite: req.body.tramite,
      nota: req.body.nota,
      observaciones : req.body.observaciones,
      status: req.body.status
    }).then(tramite => {
      if (tramite === 0) {
        res.status(404).json({
          ok: false,
          err: 'El tramite no pudo ser creado'
        });
      } else {
        res.status(200).json({
          ok: true,
          tramite:tramite,
          msg: `El tramite ha sido creado`
        });
      }
    }).catch(Sequelize.ValidationError, function(msg) {
      return res.status(422).json({
        message: msg.errors
      });
    }).catch(function(err) {
      console.log('fallo la creacion', err)
      return res.status(400).json({ message: err });
    });
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(function(err) {
    console.log('fallo la busqueda de tramite', err)
    return res.status(400).json({ message: err });
  });
})



module.exports = app;