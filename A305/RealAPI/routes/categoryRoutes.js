const express = require('express');
const router = express.Router();

const pool = require('../config/db');
const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.getAll);

router.post('/category', async (req, res) => {
    try {
        let sql = 'insert into category (name) values (?)';
        let body = req.body;
        let data = [body.name];
        let [result] = await pool.query(sql, data);
        let [row] =  await pool.query('select * from category where id = ?', [result.insertId]);
        console.log(row);
        
        res.json({
            result : true,
            msg : 'Create Category Successfully',
            data : row[0]
        })
    } catch (error) {
        console.log(error);
        res.json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
});

router.put('/category/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        let sql = 'update category set name = ? where id = ?';
        let body = req.body;
        let data = [body.name, req.params.id];
        let [result] = await pool.query(sql, data);
        let [row] =  await pool.query('select * from category where id = ?', [req.params.id]);
        console.log(row);
        
        return  res.json({
            result : true,
            msg : 'Update Category Successfully',
            data : row[0]
        })

    } catch (error) {
        console.log(error);
        return  res.json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
})

router.delete('/category/:id', async (req, res) => {
    try {
        let [row] = await pool.query('select * from category where id = ?', [req.params.id]);
     
        if(row.length == 0){
            return res.json({
                result : false,
                msg : 'Category not found'
            })
        }
        let [result] = await pool.query('delete from category where id = ?', [req.params.id]);

        return res.json({
            result : true,
            msg : 'Delete Category successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result : false,
            msg : 'Internal Server Error'
        })
    }
})


module.exports = router;