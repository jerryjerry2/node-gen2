const pool = require('../config/db');

const getAll = async function(){
    const [rows] = await pool.query('select * from category');

    return rows;
}

const getById = async function(id){
    const [row] = await pool.query('select * from category where id = ?', [id]);

    return row;
}

const create = async function (body) {
    let sql = 'insert into category (name) values (?)';
    let data = [body.name];
    let [result] = await pool.query(sql, data);
  
    return result.insertId;
}

const update  = async function (body, id){
    let sql = 'update category set name = ? where id = ?';
    let data = [body.name, id];
    let [result] = await pool.query(sql, data);
}

const remove = async function (id) {
    await pool.query('delete from category where id = ?', [id]);
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}