'use strict'
require('dotenv').config({path: __dirname + '/.env'})

console.log(dot_env);
module.exports = {
    secret: 'citdfRulez',
    port: process.env.DB_PORT || 3306,
    db: {
        database: process.env.DB_DATABASE || 'wordpress',
        user: process.env.DB_USERNAME || 'wordpress',
        password: process.env.DB_PASSWORD || 'ingTDF.19',
        options: {
        dialect: process.env.DB_DIALECT || 'mysql',
        host: process.env.DB_HOST || 'localhost'
        }
    },
    username: 'wordpress',
    password: 'ingTDF.19',
    database: 'wordpress',
    host: 'localhost',
    dialect: 'mysql'
}
