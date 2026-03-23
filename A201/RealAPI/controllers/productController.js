const productService = require('../services/productService');
const productModel = require('../models/productModel');

const getAll = async (req, res) => {
    try {
        const rows = await productService.getAll();

        res.status(200).json({
            result : true,
            msg : 'Get all Product Successfully',
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
        let result = await productService.create(req.body);
        
        res.json({
            result : true,
            msg : 'Create Product Successfully',
            data : result[0]
        })
    } catch (error) {
        console.log(error);
        res.json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
}

const update = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        let sql = 'update products set name = ?, category = ?, description = ? where id = ?';
        let body = req.body;
        let data = [body.name, body.category, body.description, req.params.id];
        let [result] = await pool.query(sql, data);
        let [row] =  await pool.query('select * from products where id = ?', [req.params.id]);
        console.log(row);
        
        return  res.json({
            result : true,
            msg : 'Update Product Successfully',
            data : row[0]
        })

    } catch (error) {
        console.log(error);
        return  res.json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
}

const remove = async (req, res) => {
    try {
        let [row] = await productModel.getById(req.params.id);
     
        if(row.length == 0){
            return res.json({
                result : false,
                msg : 'Product not found'
            })
        }
        let [result] = await pool.query('delete from products where id = ?', [req.params.id]);

        return res.json({
            result : true,
            msg : 'Delete Product successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result : false,
            msg : 'Internal Server Error'
        })
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
}