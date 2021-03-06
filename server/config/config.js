'use strict'
require('dotenv').config({path: __dirname + '/.env'})

console.log('variables de entorno: ',dot_env);
module.exports = {
    secret: 'citdfRulez',
    port: process.env.DB_PORT || 3306,
    db: {
        database: process.env.DB_DATABASE || 'wordpress',
        user: process.env.DB_USERNAME || 'wordpress',
        password: process.env.DB_PASSWORD || 'ingTDF.19',
        options: {
        dialect: process.env.DB_DIALECT || 'mysql',
        host: process.env.DB_HOST || 'http://api-deeze.tk'
        }
    },
    username: process.env.DB_USERNAME || 'wordpress',
    password: process.env.DB_PASSWORD || 'ingTDF.19',
    database: process.env.DB_DATABASE || 'wordpress',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql'
}
