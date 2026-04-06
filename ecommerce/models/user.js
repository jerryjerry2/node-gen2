const pool = require('../configs/db');

const findByEmail = async (email) => {
    const [row] = await pool.query('select id, name, email, password, phone, address, role from users where email = ?', [email]);

    return row;
}

const findById = async (id) => {
    const [row] = await pool.query('select id, name, email, phone, address, role, token from users where id = ?', [id]);

    return row;
}

const create = async (body) => {
    let arr = [body.name, body.email, body.password, body.verificationToken, body.verificationExpired];
    const [result] = await pool.query('insert into users (name, email, password, verification_token, verification_expires) values (?,?,?,?,?)', arr);

    return result.insertId;
}

const addToken = async (token, id) => {
    await pool.query('update users set token = ? where id = ?', [token, id]);
}

const getByToken = async (token) => {
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
    getByToken,
    deleteToken
}