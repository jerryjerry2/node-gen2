const productService = require('../services/productService');
const pool = require('../config/db');

const getAll = async (req, res) => {
    try {
        let rows = await productService.getAll();

        return res.status(200).json({
            result: true,
            msg: 'Get all products successfully',
            data: rows
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error',
        })
    }
}

const create = async (req, res) => {
    try {
        let row = await productService.create(req.body);

        return res.json({
            result: true,
            msg: 'Create Product successfully',
            data: row[0]
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error',
        })
    }
}

const update = async (req, res) => {
    try {
        let [check_id] = await pool.query('select * from products where id = ?', [req.params.id]);
        if (check_id.length == 0) {
            return res.json({
                result: false,
                msg: 'No Product Found',
            })
        }

        let sql = 'update products set name = ?, category_id = ?, description = ? where id = ?';
        let data = [req.body.name, req.body.category_id, req.body.description, req.params.id];
        await pool.query(sql, data);
        let [row] = await pool.query('select * from products where id = ?', [req.params.id]);

        return res.json({
            result: true,
            msg: 'Update Product successfully',
            data: row[0]
        })
    } catch (error) {
        console.log(error);
        return res.json({
            result: false,
            msg: 'Internal Server Error',
        })
    }
}

const remove = async (req, res) => {
    try {
        await productService.remove(req.params.id);

        return res.json({
            result: true,
            msg: 'Delete Product successfully',
        })
    } catch (error) {
        console.log(error);
        return res.json({
            result: false,
            msg: error.message,
        })
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
}