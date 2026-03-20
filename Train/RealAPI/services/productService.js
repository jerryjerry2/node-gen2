const pool = require('../config/db');

const getAll = async function name() {
    const [rows] = await pool.query('select * from products');

    return rows;
}

const create = async function (body){
    let sql = 'insert into products (name, category, description) values (?, ?, ?)';
    let data = [body.name, body.category, body.description];
    let [result] = await pool.query(sql, data);
    let [row] =  await pool.query('select * from products where id = ?', [result.insertId]);
    console.log(row);

    return row;
}

module.exports = {
    getAll,
    create
}