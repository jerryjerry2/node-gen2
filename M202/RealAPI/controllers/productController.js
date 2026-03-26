const pool = require('../config/db');

const getAll = async (req, res) => {
    try {
        let [rows] = await pool.query('select * from products');
        console.log(rows);
        
        res.status(200).json({
            result : true,
            msg : 'Get all products successfully',
            data : rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
}

const create = async (req, res) => {
    try {
        let body = req.body;
        let arr = [body.name, body.category, body.description];
        let [result] = await pool.query('insert into products (name, category_id, description) values (?, ?, ?)', arr);
        let [row] = await pool.query('select * from products where id = ?', result.insertId);
        console.log(result);
        
        res.json({
            result : true,
            msg : 'Create Product successfully',
            data : row[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
}

module.exports = {
    getAll,
    create
}