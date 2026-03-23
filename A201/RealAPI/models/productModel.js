const pool = require('../config/db');

const getAll = async function(){
    const [rows] = await pool.query('select * from products');

    return rows;
};

const getById = async function(id){
    const [rows] = await pool.query('select * from products where id = ?', [id]);
    
    return rows;
};

const create = async function (body) {
    let sql = 'insert into products (name, category, description) values (?, ?, ?)';
    let data = [body.name, body.category, body.description];
    let [result] = await pool.query(sql, data);

    return result.insertId;
}

const update = async function (body, id){
    let sql = 'update products set name = ?, category = ?, description = ? where id = ?';
    let data = [body.name, body.category, body.description, id];
    let [result] = await pool.query(sql, data);

    return result;
}

const remove = async function(id){
    let [result] = await pool.query('delete from products where id = ?', id);

    return result;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}