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

const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
  // Obtengo Todos los tramites
  let { id, matriculadoId, active } = req.query;
  console.log('reqest query', req.query, req.body)
  // let limit = +req.query.pageSize || 5;
  let offset = 0;
  let count = 0;
  let where = {
    [Op.and]: [
      req.query.id ? {id: {
        [Op.like]: id ? `${id}` : '%%'
        }
      } : '',
      req.query.matriculadoId ? {matriculadoId: {
        [Op.like]: matriculadoId ? `${matriculadoId}` : '%%'
        }
      } : '',
      req.query.active ? {active: {[Op.and]: {active : `${req.query.active}`}}} : ''
    ]
  };
  
  db.aprobadores.findAndCountAll().then((data) => {
    // let page = +req.query.pageNumber || 0;
    // let pages = Math.ceil(data.count / limit);
    // offset = (page) * limit;
    // count = data.count;
    db.aprobadores.findAll({
        attributes: ['id','matriculadoId','observaciones','active','createdAt','updatedAt'],
        // limit: limit,
        // offset: offset,
        include: [{
          model: db.wp_users,
          as: 'matriculado',
          where: {matriculadoId: Sequelize.col('aprobadores.matriculadoId')}
        }],
        where: where,
        order: [
          ["createdAt", "Desc"]
        ]
      })
      .then(aprobadores => {
        res.status(200).json({
          ok: true,
          payload: aprobadores
        });
      });
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(Sequelize.DatabaseError,function(err) {
    return res.status(400).json({ message: "Error al conectarse a la base de datos",err });
  }).catch(function(err) {
    return res.status(400).json({ message: "Error al recuperar los aprobadores",err });
  });
});

app.get('/find', (req, res, next) => {
  // Obtengo Todos los tramites
  let { matriculadoId, active } = req.query;
  console.log('reqest query', req.query, req.body)
  // let limit = +req.query.pageSize || 5;
  let where = {
    [Op.and]: [
      req.query.matriculadoId ? {matriculadoId: {
        [Op.like]: matriculadoId ? `${matriculadoId}` : '%%'
        }
      } : '',
      req.query.active ? {active: {
        [Op.like]: active ? `${active}` : '%%'
        }
      } : '',
    ]
  };
  db.aprobadores.findOne({
    attributes: ['id','matriculadoId','observaciones','active','createdAt','updatedAt'],
    include: [{
      model: db.wp_users,
      as: 'matriculado',
      where: {matriculadoId: Sequelize.col('aprobadores.matriculadoId')}
    }],
    where: where
  })
  .then(aprobador => {
    res.status(200).json({
      ok: true,
      payload: aprobador
    });
  }).catch(Sequelize.DatabaseError,function(err) {
    return res.status(400).json({ message: "Error al conectarse a la base de datos",err });
  }).catch(function(err) {
    return res.status(400).json({ message: "Error al recuperar aprobador",err });
  });
});

app.put('/:id', (req, res) => {
  console.log(req.body);

  db.aprobadores.update({
    observaciones: req.body.observaciones,
    active: req.body.active
  }, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      res.status(404).json({
        ok: false,
        err: 'El aprobador no existe'
      });
    } else {
      res.status(200).json({
        ok: true,
        aprobador: result,
        msg: `El aprobador ha sido actualizado`
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
  db.aprobadores.create({
    matriculadoId: req.body.matriculado.ID,
    observaciones : req.body.observaciones,
    active: 1
  }).then(aprobador => {
    if (aprobador === 0) {
      res.status(404).json({
        ok: false,
        err: 'El aprobador no pudo ser creado'
      });
    } else {
      res.status(200).json({
        ok: true,
        aprobador:aprobador,
        msg: `El aprobador ha sido creado`
      });
    }
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(function(err) {
    return res.status(400).json({ message: err });
  });
})


module.exports = app;