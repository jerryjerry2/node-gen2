const pool = require('../config/db');

const getAll = async function name() {
    const [rows] = await pool.query('select * from category');

    return rows;
}

const create = async function name(body) {
    let sql = 'insert into category (name) values (?)';
    let data = [body.name];
    let [result] = await pool.query(sql, data);
    let [row] = await pool.query('select * from category where id = ?', [result.insertId]);

    return row;
}

const update = async function (body, id) {
    let sql = 'update category set name = ? where id = ?';
    let data = [body.name, id];
    let [result] = await pool.query(sql, data);
    let [row] = await pool.query('select * from category where id = ?', [id]);

    return row;
}

const remove = async function (id) {
    let [result] = await pool.query('delete from category where id = ?', [id]);

    return result;
}

const getById = async function (id){
    const [rows] = await pool.query('select * from category where id = ?', [id]);

    return rows;
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    getById
}