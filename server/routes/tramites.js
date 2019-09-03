const express = require('express');
var cors = require('cors');
const dot_env = require('dotenv').config();
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
  endpoint:dot_env.parsed.CITDF_WPAPI
})
const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
  // Obtengo Todos los tramites
  console.log(req.query);
  let { filter, id, userId, tramite, status, documentoNro, sortField, sortDirection } = req.query;
  let limit = +req.query.pageSize || 5;
  let offset = 0;
  let count = 0;
  let where = {
    [Op.and]: [
      {id: {
        [Op.like]: id !== undefined ? `${id}` : '%%'
        }
      },
      {userId: {
        [Op.like]: userId !== undefined ? `${userId}` : '%%'
        }
      },
      {tramite: {
        [Op.like]: tramite !== undefined ? `${tramite}` : '%%'
        }
      },
      {status: {
        [Op.like]: status !== undefined ? `${status}` : '%%'
        }
      },
      {documentoNro: {
        [Op.like]: documentoNro !== undefined ? `${documentoNro}` : '%%'
        }
      }
    ]
  };
  
  db.tramites.findAndCountAll().then((data) => {
    let page = +req.query.pageNumber || 0;
    let pages = Math.ceil(data.count / limit);
    offset = (page) * limit;
    count = data.count;
    db.tramites.findAll({
        attributes: ['id','userId','tramite','nota','documentoNro','valor','status','createdAt','updatedAt'],
        limit: limit,
        offset: offset,
        where: where,
        order: [
          ["createdAt", "Desc"]
        ]
      })
      .then(tramites => {
        res.status(200).json({
          ok: true,
          payload: tramites,
          count: count,
          pages: pages
        });
      });
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(function(err) {
    return res.status(400).json({ message: "Error al recuperar los trámites",err });
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

module.exports = app;