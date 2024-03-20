//cadena de conexión a bd.
const {Pool} = require('pg')
const{db} = require ('./config')


const pool = new Pool({ //instancia
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
})

module.exports = pool;