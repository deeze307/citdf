'use strict';
module.exports = (sequelize, DataTypes) => {
  const slider_img = sequelize.define('slider_img', {
    display_name: DataTypes.STRING,
    url: DataTypes.STRING,
    enabled: DataTypes.INTEGER
  }, {timestamps:false});
  slider_img.associate = function(models) {
    // associations can be defined here
  };
  return slider_img;
};