const pool = require('../configs/db');

const findByEmail = async (email) => {
    let [row] = await pool.query('select * from users where email = ?', [email]);
    
    return row;
}

const findById = async (id) => {
    let [row] = await pool.query('select id, name, phone, address, role from users where id = ?', [id]);

    return row;
}

const create = async (body) => {
    let data = [body.name, body.email, body.password];
    let [result] = await pool.query('insert into users (name, email, password) values (?, ?, ?)', data);

    return result.insertId;
}

module.exports = {
    findByEmail,
    findById,
    create
}