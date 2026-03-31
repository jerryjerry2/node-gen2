const pool = require('../configs/db');

const findByEmail = async (email) => {
    const [row] = await pool.query('select id, name, email, password, phone, address, role from users where email = ?', [email]);

    return row;
}

const findById = async (id) => {
    const [row] = await pool.query('select id, name, email, phone, address, role from users where id = ?', [id]);

    return row;
}

const create = async (body) => {
    let arr = [body.name, body.email, body.password]
    const [result] = await pool.query('insert into users (name, email, password) values (?,?,?)', arr);

    return result.insertId;
}

module.exports = {
    findByEmail,
    findById,
    create,
}