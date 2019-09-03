'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CITDF_API : "http://localhost:3031",
  CITDF_WPAPI : "http://localhost/citdf/wordpress/wp-json",
  CITDF_ADMIN_USER : "citdf",
  CITDF_ADMIN_PASS : "ingTDF.19",
  DB_USERNAME : "wordpress",
  DB_PASSWORD : "ingTDF.19",
  DB_DATABASE : "wordpress",
  DB_HOST : "localhost",
  DB_DIALECT : "mysql",
  DB_PORT : 3306
,
})
