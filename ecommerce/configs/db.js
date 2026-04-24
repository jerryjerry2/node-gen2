const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : 'root',
    password : 'mineadub',
    database : 'ecommerce',
});

module.exports = pool;

