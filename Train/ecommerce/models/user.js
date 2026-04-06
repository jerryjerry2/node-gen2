const pool = require('../configs/db');

const findByEmail = async (email) => {
    let [row] = await pool.query('select * from users where email = ?', [email]);
    
    return row;
}

const findById = async (id) => {
    let [row] = await pool.query('select id, name, phone, address, role, token, is_verified from users where id = ?', [id]);

    return row;
}

const findByVerificationToken = async (token) => {
    let [row] = await pool.query(`select id, name, email, is_verified, 
    verification_token, verification_expires from users where verification_token = ?`, [token]);

    return row;
}

const create = async (body) => {
    let data = [body.name, body.email, body.password, body.verification_token, body.verificationExpires];
    let [result] = await pool.query('insert into users (name, email, password, verification_token, verification_expires) values (?, ?, ?, ?, ?)', data);

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

const verifyEmail = async (id) => {
    await pool.query('update users set is_verified = 1 where id = ?', [id]);
}

const resendVerificationEmail = async (body) => {
    let arr = [body.verificationToken, body.verificationExpires, body.id];

    await pool.query(`update users set verification_token = ?, verification_expires = ?
    WHERE id = ?`, arr);
}

module.exports = {
    findByEmail,
    findById,
    create,
    addToken,
    findByToken,
    deleteToken,
    findByVerificationToken,
    verifyEmail,
    resendVerificationEmail
}