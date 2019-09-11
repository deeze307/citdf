'use strict';
module.exports = (sequelize, DataTypes) => {
  const generals = sequelize.define('generals', {
    key: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {timestamps:false});
  generals.associate = function(models) {
    // associations can be defined here
  };
  return generals;
};