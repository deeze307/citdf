'use strict';
module.exports = (sequelize, DataTypes) => {
  const wp_usermeta = sequelize.define('wp_usermeta', {
    umeta_id:DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    meta_key: DataTypes.STRING,
    meta_value: DataTypes.STRING,
  }, {timestamps:false});
  wp_usermeta.associate = function(models) {
    // associations can be defined here
  };

  return wp_usermeta;
};