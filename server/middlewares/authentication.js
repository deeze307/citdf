const jwt = require('jsonwebtoken');
const node_env = process.env.NODE_ENV || 'development';
const jwt_secret = process.env.JWT_SECRET;
const SEED = [node_env].SEED;

//Verificar token
exports.verifyToken = function(req, res, next) {
  // Express headers are auto converted to lowercase;
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if(token){
    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token incorrecto',
          errors: err
        });
      }
      req.user = decoded.user;
      next();
    });
  }else {
    return res.json({
      success: false,
      message: 'No ha proporcionado un Token'
    });
  }
}

//Verificar Admin
exports.verifyAdmin = function(req, res, next) {
  let user = req.user;
  if (user.role === 'ADMIN_ROLE') {
    next();
    return;
  } else {
    return res.status(401).json({
      ok: false,
      message: 'Token incorrecto',
      errors: { message: 'Permiso Denegado para realizar esta tarea' }
    });
  }
}

//Verificar Admin o mismo usuario
exports.verifyAdminOrSelfUser = function(req, res, next) {
  let user = req.user;
  let id = req.params.id;
  if (user.role === 'ADMIN_ROLE' || user._id === id) {
    next();
    return;
  } else {
    return res.status(401).json({
      ok: false,
      message: 'Token incorrecto - no es admin ni el mismo usuario',
      errors: { message: 'Permiso denegado para realizar esta tarea' }
    });
  }
}