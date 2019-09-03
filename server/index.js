const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Sequelize = require('sequelize');

const env = require('dotenv').config();
const node_env = process.env.NODE_ENV || 'production';
const port = 3031;

// // Firebase
// const admin = require('../node_modules/firebase-admin');
// const serviceAccount = require("./config/teu-app-firebase-adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://teu-app.firebaseio.com"
// });

let sequelize;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


sequelize = new Sequelize({
  dialect: env.parsed.DB_DIALECT,
  username: env.parsed.DB_USERNAME,
  port: env.parsed.DB_PORT,
  password: env.parsed.DB_PASSWORD,
  host: env.parsed.DB_HOST,
  database: env.parsed.DB_DATABASE
});

if (node_env === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-HTTP-Method-Override, X-Request-With, Content-Type,  content-type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, POST, GET, PUT, PATCH, DELETE, OPTIONS');
    next();
  });

}

  // SE IMPORTAN LAS RUTAS
  const usersRoutes = require('./routes/users');
  const menuRoutes = require('./routes/menu');
  const bolsaTrabajoRoutes = require('./routes/bolsa_trabajo');
  const novedadesRoutes = require('./routes/novedades');
  const colegioRoutes = require('./routes/colegio');
  const contactoRoutes = require('./routes/contacto');
  const tramitesRoutes = require('./routes/tramites');
  const beneficiosRoutes = require('./routes/beneficios');
  // const loginRoutes = require('./routes/login');

  // LAS RUTAS
  app.use('/users', usersRoutes);
  app.use('/menu',menuRoutes);
  app.use('/bolsa_trabajo',bolsaTrabajoRoutes);
  app.use('/novedades',novedadesRoutes);
  app.use('/colegio',colegioRoutes);
  app.use('/contacto',contactoRoutes);
  app.use('/tramites',tramitesRoutes);
  app.use('/beneficios',beneficiosRoutes);
  // app.use('/login',loginRoutes);

app.get('/', (request, response) => {
    response.json({ info: 'VueJs, Node.js, Express, and WordPress-API' })
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos MySql exitosa.');
  })
  .catch(err => {
    console.error('No fue posible conectar con la base de datos:', err);
  });

app.listen(port, () => {
    console.log(`App corriendo en el puerto ${port}. | host: ${process.env.host}`)
})