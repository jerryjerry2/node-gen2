const express = require('express');
const mysql = require('mysql2/promise');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host : "localhost",
    user : 'root',
    password : 'mineadub',
    database : 'ecommerce305'
});

app.use(productRoutes);

app.post('/product', async (req, res) => {
    try {
        let sql = 'insert into products (name, category, description) values (?, ?, ?)';
        let body = req.body;
        let data = [body.name, body.category, body.description];
        let [result] = await pool.query(sql, data);
        let [row] =  await pool.query('select * from products where id = ?', [result.insertId]);
        console.log(row);
        
        res.json({
            result : true,
            msg : 'Create Product Successfully',
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

app.put('/product/:id', async (req, res) => {
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
})

app.delete('/product/:id', async (req, res) => {
    try {
        let [row] = await pool.query('select * from products where id = ?', [req.params.id]);
     
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
})

app.get('/category',async (req, res) => {
    try {
        const [rows] = await pool.query('select * from category');

        res.status(200).json({
            result : true,
            msg : 'Get all Category Successfully',
            data : rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
});

app.post('/category', async (req, res) => {
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

app.put('/category/:id', async (req, res) => {
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

app.delete('/category/:id', async (req, res) => {
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
   

app.listen(3000, () => {
    console.log('Server running on port 3000');
})