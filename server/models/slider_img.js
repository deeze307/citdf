'use strict';
module.exports = (sequelize, DataTypes) => {
  const sliderimg = sequelize.define('slider_img', {
    display_name: DataTypes.STRING,
    url: DataTypes.STRING,
    enabled: DataTypes.INTEGER
  }, {timestamps:false});
  sliderimg.associate = function(models) {
    // associations can be defined here
  };
  return sliderimg;
};