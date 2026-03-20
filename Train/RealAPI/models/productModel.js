const pool = require('../config/db');

const getAll = async function name() {
    const [rows] = await pool.query('select * from products');
     
    return rows;
}

module.exports = {
    getAll
}