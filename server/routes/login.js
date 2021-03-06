const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Sequelize = require('../models').Sequelize;
const node_env = process.env.NODE_ENV || 'development';
const jwt_secret = process.env.JWT_SECRET;
const mdAuthentication = require('../middlewares/authentication');
// const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
// const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const app = express();
const User = require('../models/wp_users');

// ==========================================
// Renueva token
// ==========================================
app.get('/renewtoken', mdAuthentication.verifyToken, (req, res) => {
  let token = jwt.sign({ user: req.user }, jwt_secret, { expiresIn: 14400 });
  res.status(200).json({
    ok: true,
    token: token,
  });
});


// ==========================================
// Autenticación de google
// ==========================================
// app.post('/google', async(req, res) => {
//   let token = req.body.token || 'XXX';

//   let googleUser = await verify(token)
//     .catch(e => {
//       return res.status(403).json({
//         ok: false,
//         message: 'Token no válido'
//       });
//     });


//   User.findOne({ email: googleUser.email }, (err, userFound) => {
//     if (err) {
//       return res.status(500).json({
//         ok: false,
//         message: 'Error al buscar usuario',
//         errors: err
//       });
//     }
//     if (userFound) {
//       if (userFound.google === false) {
//         return res.status(400).json({
//           ok: false,
//           message: 'Debe usar la autenticación normal',
//           errors: err
//         });
//       } else {
//         userFound.password = ':P'
//         let token = jwt.sign({ user: userFound }, jwt_secret, { expiresIn: 14400 });
//         res.status(200).json({
//           ok: true,
//           user: userFound,
//           token: token,
//           id: userFound._id,
//           menu: getMenu(userFound.roles)
//         });
//       }
//       //si el usuario no existe por correo de google
//     } else {
//       let user = new User();
//       user.name = googleUser.name;
//       user.email = googleUser.email;
//       user.lastname = googleUser.lastname;
//       user.password = ':)';
//       user.img = googleUser.img;
//       user.google = true;
//       user.roles = ['USER_ROLE']
//       user.save((err, userCreated) => {
//         if (err) {
//           return res.status(500).json({
//             ok: false,
//             message: 'Error al crear usuario - google',
//             errors: err
//           });
//         }
//         let token = jwt.sign({ user: userCreated }, jwt_secret, { expiresIn: 14400 });
//         res.status(200).json({
//           ok: true,
//           user: userCreated,
//           token: token,
//           id: userCreated._id,
//           menu: getMenu(userCreated.roles)
//         });
//       })
//     }
//   });
// });

// ==========================================
// Verificación de Token
// ==========================================
async function verify(token) {

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  let payload = ticket.getPayload();
  let userid = payload['sub'];
  return {
    name: payload.name,
    lastname: payload.family_name,
    email: payload.email,
    img: payload.picture,
    google: true,
    payload: payload
  }
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}

// ==========================================
// Autenticación normal
// ==========================================
app.post('/me', (req, res, next) => {
  let body = req.body;
  let where = { email: body.email};
  db.user.findOne({ where: where })
  .then(user =>{
    if(user){
      if(!bcrypt.compareSync(body.password, user.password)) {
        res.status(400).json({
          ok: false,
          message: 'Credenciales incorrectas',
          errors: 'Credenciales incorrectas'
        });
      }else{
        //Crear un token
        //expira en 4hs
        let token = jwt.sign({ user: user }, jwt_secret, { expiresIn: 14400 });
        res.status(200).json({
          ok: true,
          user: user,
          token: token
          // menu: getMenu(userFound.roles)
        });
      }
      
    }else{
      res.status(500).json({
        ok:false,
        message:"No se encontró usuario con ese correo"
      })
    }
    
  })
  .catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(function(err) {
    return res.status(400).json({ message: "issues trying to connect to database",error:err });
  });

   

});

module.exports = app;