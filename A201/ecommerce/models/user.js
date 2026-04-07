const pool = require('../config/db');

const getByEmail = async (email) => {
    let [row] = await pool.query('select id, email, password, phone, address, is_verified from users where email = ?' , [email]);

    return row;
}

const getById = async (id) => {
    let [row] = await pool.query('select id, name, email, phone, address, token from users where id = ?' , [id]);

    return row;
}

const create = async (body) => {
    let arr = [body.name, body.email, body.password, body.verificationToken, body.verificationExpires];
    let [result] = await pool.query('insert into users (name, email, password, verification_token, verification_expires) values (?,?,?, ?, ?)', arr);

    return result.insertId;
}

const addToken = async (token, id) => {
    await pool.query('update users set token = ? where id = ?', [token, id]);
}

const findByToken = async (token) => {
    let [row] = await pool.query('select id, name, email, phone, address, token from users where token = ?' , [token]);

    return row;
}

const deleteToken = async (id) => {
    await pool.query('update users set token = null where id = ?', [id]);
}


module.exports = {
    getByEmail,
    getById,
    create,
    addToken,
    findByToken,
    deleteToken
}