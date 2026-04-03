const pool = require('../configs/db');

const findByEmail = async (email) => {
    let [row] = await pool.query('select * from users where email = ?', [email]);
    
    return row;
}

const findById = async (id) => {
    let [row] = await pool.query('select id, name, phone, address, role, token from users where id = ?', [id]);

    return row;
}

const create = async (body) => {
    let data = [body.name, body.email, body.password];
    let [result] = await pool.query('insert into users (name, email, password) values (?, ?, ?)', data);

    return result.insertId;
}

const addToken = async (token, id) => {
    await pool.query('update users set token = ? where id = ?', [token, id]);
}

const findByToken = async (token) => {
    let [row] = await pool.query('select token from users where token = ?', [token]);

    return row;
}

const deleteToken = async (id) => {
    await pool.query('update users set token = null where id = ?', [id]);
}

module.exports = {
    findByEmail,
    findById,
    create,
    addToken,
    findByToken,
    deleteToken
}