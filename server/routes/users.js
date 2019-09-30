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

app.get('/matriculados',(req,res) => {
  // Obtengo Todos los tramites
  let { ID, user_login, user_email, user_status, display_name, ciudad, titulo_profesional, documento_nro, admin} = req.query;
  // // let limit = +req.query.pageSize || 5;
  // // let offset = 0;
  let where = {
    [Op.and]: [
      {user_id:{
        [Op.notIn]:[1,2,353]
        }
      },
      {meta_value: {
        [Op.not]: 'citdf'
        }
      },
      {meta_value: {
        [Op.not]: 'dmaidana'
        }
      }
      ,
      {meta_value: {
        [Op.not]: 'secretaria'
        }
      },
      {meta_key: {
        [Op.regexp]: '^[A-Z a-z]'
        }
      },
      {meta_key:{
        [Op.not]:'rich_editing'
        }
      },
      {meta_key:{
        [Op.not]:'syntax_highlighting'
        }
      },
      {meta_key:{
        [Op.not]:'comment_shortcuts'
        }
      },
      {meta_key:{
        [Op.not]:'admin_color'
        }
      },
      {meta_key:{
        [Op.not]:'use_ssl'
        }
      },
      {meta_key:{
        [Op.not]:'show_admin_bar_front'
        }
      },
      {meta_key:{
        [Op.not]:'locale'
        }
      },
      {meta_key:{
        [Op.not]:'wp_user_level'
        }
      },
      {meta_key:{
        [Op.not]:'dismissed_wp_pointers'
        }
      },
      {meta_key:{
        [Op.not]:'wp_capabilities'
        }
      }
    ]
  };
  
  db.wp_usermeta.findAll({
    attributes: ['umeta_id','user_id','meta_key','meta_value'],
    // limit: count,
    // offset: null,
    where: where,
    // order: [
    //   ["ID", "Asc"]
    // ]
  })
  .then(mat => {
    let usuarios = [];
    let u_temp;
    mat.map(usuario =>{
      if(usuario.user_id !== u_temp){
        u_temp = usuario.user_id;
        let alreadyUser = false;
        usuarios.map(us =>{
          if(us.ID === usuario.user_id){
            alreadyUser = true;
          }
        })
        if(!alreadyUser){
          usuarios.push({ID:usuario.user_id});
        }
      }
    });
    
    let matriculados = usuarios.map(usuario =>{
      mat.map(m => {
        if(m.user_id === usuario.ID){
          if(m.meta_key ==="first_name"){
            usuario.first_name = m.meta_value
          }
          if(m.meta_key ==="nickname"){
            usuario.nickname = m.meta_value
          }
          if(m.meta_key ==="matricula"){
            usuario.matricula = m.meta_value
          }
          if(m.meta_key ==="last_name"){
            usuario.last_name = m.meta_value
          }
          if(m.meta_key ==="email"){
            usuario.user_email = m.meta_value
          }
          if(m.meta_key ==="user_email" && m.meta_key !==""){
            usuario.user_email = m.meta_value
          }
          if(m.meta_key ==="user_url"){
            usuario.user_url = m.meta_value
          }
          if(m.meta_key ==="description"){
            usuario.description = m.meta_value
          }
          if(m.meta_key ==="res"){
            usuario.res = m.meta_value
          }
          if(m.meta_key ==="titulo_profesional"){
            usuario.titulo_profesional = m.meta_value
          }
          if(m.meta_key ==="universidad"){
            usuario.universidad = m.meta_value
          }
          if(m.meta_key ==="promocion"){
            usuario.promocion = m.meta_value
          }
          if(m.meta_key ==="titulo_profesional_2"){
            usuario.titulo_profesional_2 = m.meta_value
          }
          if(m.meta_key ==="universidad_2"){
            usuario.universidad_2 = m.meta_value
          }
          if(m.meta_key ==="promocion_2"){
            usuario.promocion_2 = m.meta_value
          }
          if(m.meta_key ==="documento_nro"){
            usuario.documento_nro= m.meta_value
          }
          if(m.meta_key ==="ciudad"){
            usuario.ciudad= m.meta_value
          }
          if(m.meta_key ==="telefono"){
            usuario.telefono = m.meta_value
          }
          if(m.meta_key ==="direccion"){
            usuario.direccion= m.meta_value
          }
          if(m.meta_key ==="apt"){
            usuario.apt = m.meta_value
          }
          if(m.meta_key ==="perfil_de_facebook"){
            usuario.perfil_de_facebook = m.meta_value
          }
          if(m.meta_key ==="perfil_de_linkedin"){
            usuario.perfil_de_linkedin= m.meta_value
          }
          if(m.meta_key ==="observaciones"){
            usuario.observaciones= m.meta_value
          }
          if(m.meta_key ==="habilitado"){
            if(m.meta_value == 1){
              usuario.habilitado = true
            }else{
              usuario.habilitado = false
            }
          }
          if(m.meta_key ==="newsletter"){
            if(m.meta_value == 1){
              usuario.newsletter = true
            }else{
              usuario.newsletter = false
            }
          }
        }
      });
      usuario.display_name = usuario.last_name + " " + usuario.first_name;
    })

    if(ciudad && ciudad!=="" && ciudad!=="Todos"){
      let filtered=[]
      usuarios.map(u =>{
        if(u.ciudad === ciudad){
          filtered.push(u)
        }
      })
      usuarios = filtered;
    }
    if(titulo_profesional && titulo_profesional!=="" && titulo_profesional!=="Todos"){
      let filtered=[]
      usuarios.map(u =>{
        if(u.titulo_profesional === titulo_profesional){
          filtered.push(u)
        }
      })
      usuarios = filtered;
    }

    if(admin && admin ==="" || admin == 'false'){
      let filtered=[]
      usuarios.map(u =>{
        if(u.habilitado === true){
          filtered.push(u)
        }
      })
      usuarios = filtered;
    }

    if(documento_nro && documento_nro!==""){
      let filtered=[]
      usuarios.map(u =>{
        console.log(u.documento_nro +" | "+ documento_nro)
        if(u.documento_nro === documento_nro){
          filtered.push(u)
        }
      })
      usuarios = filtered;
    }

    res.status(200).json({
      ok:true,
      payload:usuarios
    });
  })
  .catch(function(error){
    res.status(400).json({
      ok:false,
      error:error
    });
  });
});

app.post('/matriculados',(req,res) => {
  let body = req.body;
  db.users.update({
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

app.get('/matriculados/como-matricularse', (req, res, next) => {
  console.log("Params:",req.query);
  wp.pages().slug('como-matricularse').then(function(response){
    return res.status(200).json({info: response[0]});
  }).catch(function(err){
    return res.status(400).json({error : err});
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
    body: {username:body.username,password:body.password}
  }, function (error, response, body){
      if(response.body.token){
        res.status(200).json({
          ok: true,
          user: response.body
        });
      }else{
        console.log("Ocurrio un error ",response.body);

        res.status(400).json({
          error: response.body
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
  wp.users().id(body.ID).update({
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

// Actualizo matriculado desde perfíl de matriculado
app.put('/matriculados/:id', (req, res) => {
  if (req.headers.authorization){
    wp.setHeaders('Authorization',req.headers.authorization);
  }
  let body = req.body;
  console.log("Body: ",body)
  // Primero actualizo datos de persona
  wp.users().id(body.ID).update({
    name:body.firstName +" "+body.lastName,
    description: body.description,
    url:body.url
  }).then(data => {
    // Despues actualizo datos de custom_fields
    let uri = process.env.CITDF_WPAPI+"/acf/v3/users/"+req.params.id;
    let apt = "";
    if(body.apt && body.apt!==""){
      body.apt.map(a =>{
        if(apt ===""){
          apt = apt+a;
        }else{
          apt = apt+"\r\n"+a;
        }
      })
    }
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

// Actualizo matriculado desde tabla de matriculados
app.put('/matriculados/from_table/:id', (req, res) => {
  if (req.headers.authorization){
    wp.setHeaders('Authorization',req.headers.authorization);
  }
  let body = req.body;
  console.log("Body: ",body)
  // Primero actualizo datos de persona
  wp.users().id(body.ID).update({
    nickname:body.nickname,
    name:body.first_name +" "+body.last_name,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.user_email,
    description: body.description,
    url:body.user_url,
  }).then(data => {
    // Despues actualizo datos de custom_fields
    let uri = process.env.CITDF_WPAPI+"/acf/v3/users/"+req.params.id;
    body.custom_fields = {
      matricula: body.matricula,
      res: body.res,
      documento_nro: body.documento_nro,
      titulo_profesional: body.titulo_profesional,
      titulo_profesional_2: body.titulo_profesional_2,
      promocion: body.promocion,
      promocion_2: body.promocion_2,
      universidad: body.universidad,
      universidad_2: body.universidad_2,
      ciudad: body.ciudad,
      direccion: body.direccion,
      telefono: body.telefono,
      perfil_de_facebook: body.perfil_de_facebook,
      perfil_de_linkedin: body.perfil_de_linkedin,
      habilitado: body.habilitado ? 1 : 0,
      email: body.user_email,
    }
    let apt = "";
    if(body.apt && body.apt!==""){
      body.apt.map(a =>{
        if(apt ===""){
          apt = apt+a;
        }else{
          apt = apt+"\r\n"+a;
        }
      })
    }
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


module.exports = app;