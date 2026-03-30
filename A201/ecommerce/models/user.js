const pool = require('../config/db');

const getByEmail = async (email) => {
    let [row] = await pool.query('select email, password from users where email = ?' , [email]);

    return row;
}

const getById = async (id) => {
    let [row] = await pool.query('select id, name, email, phone, address from users where id = ?' , [id]);

    return row;
}

const create = async (body) => {
    let arr = [body.name, body.email, body.password];
    let [result] = await pool.query('insert into users (name, email, password) values (?,?,?)', arr);

    return result.insertId;
}

module.exports = {
    getByEmail,
    getById,
    create
}