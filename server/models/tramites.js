'use strict';
module.exports = (sequelize, DataTypes) => {
  const tramites = sequelize.define('tramites', {
    userId: DataTypes.INTEGER,
    tramite: DataTypes.STRING,
    nota: DataTypes.STRING,
    status: DataTypes.INTEGER,
    valor: DataTypes.INTEGER,
    matriculaNro: DataTypes.STRING,
    documentoNro: DataTypes.INTEGER,
    observaciones: DataTypes.STRING,
    nroRegistro:DataTypes.STRING
  }, {});
  tramites.associate = function(models) {
    // associations can be defined here
  };
  return tramites;
};