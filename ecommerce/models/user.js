const pool = require('../configs/db');

const findByEmail = async (email) => {
    let [row] = await pool.query('select id, name, email, password, phone, address, is_verified from users where email = ?', [email]);

    return row;
}

const findById = async (id) => {
    let [row] = await pool.query('select id, name, email, phone, address, token from users where id = ?', [id]);

    return row;
}

const create = async (body) => {
    let arr = [body.name, body.email, body.password, body.verificationToken, body.verificationExpired];
    let [result] = await pool.query('insert into users (name, email, password, verification_token, verification_expires) values (?,?,?,?,?)', arr);
    
    return result.insertId;
}

const addToken = async (token, id) => {
    await pool.query('update users set token = ? where id = ?', [token, id]);
}

const removeToken = async (id) => {
    await pool.query('update users set token = null where id = ?', [id]);
}

const findByToken = async (token) => {
    let [row] = await pool.query('select token from users where token = ?', [token]);

    return row;
}

const findByVerificationEmail = async (token) => {
    let [row] = await pool.query('select id, name, email, phone, address, token, is_verified, verification_token, verification_expires from users where verification_token = ?', [token]);

    return row;
}

const verifyEmail = async (id) => {
    await pool.query('update users set is_verified = 1 where id = ?', [id]);
}

module.exports = {
    findByEmail,
    findById,
    create,
    addToken,
    removeToken,
    findByToken,
    findByVerificationEmail,
    verifyEmail
}