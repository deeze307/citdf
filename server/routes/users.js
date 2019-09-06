const express = require('express');
const Axios = require('axios');
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

app.get('/matriculados',(req,res,next) => {
  // Obtengo Todos los tramites
  console.log(req.query);
  let { filter, ID, user_login, user_email, user_status, display_name, sortField, sortDirection } = req.query;
  let limit = +req.query.pageSize || 5;
  let offset = 0;
  let count = 0;
  let where = {
    [Op.and]: [
      {ID: {
        [Op.like]: ID !== undefined ? `${ID}` : '%%'
        }
      },
      {user_login: {
        [Op.like]: user_login !== undefined ? `${user_login}` : '%%'
        }
      },
      {user_email: {
        [Op.like]: user_email !== undefined ? `${user_email}` : '%%'
        }
      },
      {user_status: {
        [Op.like]: user_status !== undefined ? `${user_status}` : '%%'
        }
      },
      {display_name: {
        [Op.like]: display_name !== undefined ? `${display_name}` : '%%'
        }
      }
    ]
  };
  
  db.wp_users.findAndCountAll().then((data) => {
    let page = +req.query.pageNumber || 0;
    let pages = Math.ceil(data.count / limit);
    offset = (page) * limit;
    count = data.count;
    db.wp_users.findAll({
        attributes: ['ID','user_login','user_nicename','user_email','user_url','user_status','display_name'],
        limit: limit,
        offset: offset,
        where: where,
        order: [
          ["display_name", "Asc"]
        ]
      })
      .then(mat => {
        assignACF(mat).then(matriculados =>{
          console.log("matriculados: ",matriculados);
          res.status(200).json({
            ok: true,
            payload: matriculados,
            count: count,
            pages: pages
          });
        });
      });
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(function(err) {
    return res.status(400).json({ message: "Error al recuperar los matriculados",err });
  });
});

app.get('/me', (req,res,next) => {
  if (req.headers.authorization){
    wp.setHeaders('Authorization',req.headers.authorization);
  }
  // wp.setHeaders('Authorization',`Bearer ${localStorage.getItem('LOGIN_API_TOKEN')}`);
  wp.users()
  .me()
  .then(data=>{
    return res.json({user:data})
  })
  .catch(err=>{
    return res.json({error: err})
  });
});

app.post('/login',(req,res)=>{
  let body = req.body;
  let uri = process.env.CITDF_WPAPI+"/jwt-auth/v1/token";
  Request({
    url: uri,
    method: "POST",
    json: true,   // <--Very important!!!
    body: {user_email:body.username,password:body.password}
  }, function (error, response, body){
      if(response.body.token){
        res.status(200).json({
          ok: true,
          user: response.body
        });
      }else{
        console.log("Ocurrio un error ",response.body);

        res.status(422).json({
          error: response.body.code
        });
      }
      
      return res;
  });
});

app.post('/logout',(request,response)=>{
  
});

app.put('/:id', (req, res) => {
  if (req.headers.authorization){
    wp.setHeaders('Authorization',req.headers.authorization);
  }
  let body = req.body;
  // Primero actualizo datos de persona
  wp.users().id(body.id).update({
    name:body.firstName +" "+body.lastName,
    description: body.description,
    url:body.url
  }).then(data => {
    // Despues actualizo datos de custom_fields
    let uri = process.env.CITDF_WPAPI+"/acf/v3/users/"+req.params.id;
    let apt = "";
    body.custom_fields.apt.map(a =>{
      if(apt ===""){
        apt = apt+a;
      }else{
        apt = apt+"\r\n"+a;
      }
    })
    body.custom_fields.apt = apt;
    Request({
      headers:{
        'Content-Type':'application/json',
        'Authorization':req.headers.authorization
      },
      url: uri,
      method: "POST",
      json: true,   // <--Very important!!!
      body: {fields:body.custom_fields}
    }, function (error, response, body){
      if(response.body.code){
        return res.status(401).json({
          ok: true,
          error: response.body.message
        });
      }else{
        return res.status(200).json({
          ok: true,
          user: data
        });
      }
    });
  }).catch(err =>{
    console.log("Error: ",err);
    return res.status(400).json({
      ok:false,
      error: err
    })
  })
});

app.post('/', (req, res, next) => {
    let body = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(body.password, salt);
    db.user.create({
        email: body.email,
        name: body.name,
        lastname: body.lastname,
        password: hash,
        enabled:true,
        rol: 1
    }).then(userSaved => {
        res.status(200).json({
            ok: true,
            user: userSaved,
            userToken: req.user
        });
    }).catch(Sequelize.ValidationError, function(msg) {
        return res.status(422).json({
          message: msg.errors
        });
    }).catch(function(err) {
        return res.status(400).json({ message: "Error al crear Usuario" });
    });
});

app.delete('/:id', /*mdAuthentication.verifyToken,*/ (req, res) => {
    db.user.destroy({
        where: {
          id: +req.params.id
        }
      }).then(result => {
        if (result === 0) {
          res.status(404).json({
            ok: false,
            err: `Usuario inexistente (${req.params.id})`
          });
        } else {
          res.status(200).json({
            ok: true,
            msg: `El Usuario ha sido eliminado`
          });
        }
      }).catch(Sequelize.ValidationError, function(msg) {
        return res.status(422).json({
          message: msg.errors
        });
      }).catch(Sequelize.ForeignKeyConstraintError, function(err) {
        return res.status(400).json({ message: "El Usuario no puede ser eliminado por que ya está en uso" });
      }).catch(function(err) {
        return res.status(400).json({ message: "Ocurrió un error al intentar eliminar el Usuario" });
      });
});

async function assignACF(mat){
  const promises = mat.map( async m => {
    let uri = process.env.CITDF_WPAPI+"/acf/v3/users/"+m.ID;
    const req = await Axios({method:'GET',url:uri});
    let custom_fields = req.data.acf;
    return {
      ID: m.ID,
      user_login: m.user_login,
      user_nicename: m.user_nicename,
      user_email: m.user_email,
      user_url: m.user_url,
      user_status: m.user_status,
      display_name: m.display_name,
      custom_fields : custom_fields
    };
  });

  // Espero a que terminen todas las promesas
  const matriculados = await Promise.all(promises);
  return matriculados;
}


module.exports = app;