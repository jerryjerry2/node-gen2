const pool = require('../config/db');

const getByEmail = async (email) => {
    let [row] = await pool.query('select email from users where email = ?' , [email]);

    return row;
}

module.exports = {
    getByEmail
}