'use strict';
module.exports = (sequelize, DataTypes) => {
  const wp_users = sequelize.define('wp_users', {
    ID:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_login: DataTypes.STRING,
    user_nicename: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_url: DataTypes.STRING,
    user_status: DataTypes.INTEGER,
    display_name: DataTypes.STRING
  }, {timestamps:false});
  wp_users.associate = function(models) {
    // associations can be defined here
  };

  return wp_users;
};