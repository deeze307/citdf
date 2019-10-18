'use strict';
module.exports = (sequelize, DataTypes) => {
  const pagos = sequelize.define('pagos', {
    documento_nro: DataTypes.STRING,
    pago_id: DataTypes.STRING,
    description: DataTypes.STRING,
    transaction_amount: DataTypes.INTEGER,
    factura_afip: DataTypes.STRING,
    medio_pago: DataTypes.INTEGER
  },{});
  pagos.associate = function(models) {
    // associations can be defined here
  };

  return pagos;
};