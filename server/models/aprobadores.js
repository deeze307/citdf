'use strict';
module.exports = (sequelize, DataTypes) => {
  const aprobadores = sequelize.define('aprobadores', {
    matriculadoId: DataTypes.INTEGER,
    observaciones: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {});
  aprobadores.associate = function(models) {
    // associations can be defined here
    aprobadores.hasOne(models.wp_users, {as: 'matriculado', foreignKey: 'ID', sourceKey: 'matriculadoId'})
  };
  return aprobadores;
};