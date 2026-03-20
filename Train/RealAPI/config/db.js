const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : "localhost",
    user : 'root',
    password : 'mineadub',
    database : 'ecommerce305'
});

module.exports = pool;