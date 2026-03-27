const pool = require('../config/db');

const getAll = async () => {
    let [rows] = await pool.query('select * from products');

    return rows;
}

const getById = async (id) => {
    let [rows] = await pool.query('select * from products where id = ?', [id]);

    return rows;
}

const getExistProduct = async (product_id) => {
    let [rows] = await pool.query('select product_id from order_items where product_id = ?', [product_id]);

    return rows;
} 

const create = async (body) => {
    let arr = [body.name, body.category, body.description];
    let [result] = await pool.query('insert into products (name, category_id, description) values (?, ?, ?)', arr);
    
    return result.insertId;
}

const remove = async (id) => {
    await pool.query('delete from products where id = ?', [id]);
}

module.exports = {
    getAll,
    getById,
    getExistProduct,
    remove,
    create
}