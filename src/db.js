//cadena de conexión a bd.
const {Pool} = require('pg')

const pool = new Pool({ //instancia
    user: 'postgres',
    password: '2487',
    host: "localhost",
    port: 5432,
    database: 'tasksdb'
})

module.exports = pool;