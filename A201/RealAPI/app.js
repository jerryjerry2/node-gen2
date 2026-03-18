const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'mineadub',
    database : 'ecommerce201', 
});

app.get('/products', async (req, res) => {
    try {
        let [rows] = await pool.query('select * from products');
        console.log(rows);

        res.status(200).json({
            result : true,
            msg : 'Get all product successfully',
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

app.post('/products', async (req, res) => {
    try {
        let sql = 'insert into products (name, category, description) values (?, ?, ?)';
        let body = req.body;
        let data = [body.name, body.category, body.description];
        const [result] = await pool.query(sql, data);
        const [row] = await pool.query('select * from products where id = ?', [result.insertId]);
        console.log(row);
        
        return res.json({
            result : true,
            msg : 'Create Product Successfully',
            data : row[0]
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
    
});

app.put('/products/:id', async (req, res) => {
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
});

app.delete('/product/:id', async (req, res) => {
    try {
        let [result] = await pool.query('delete from products where id = ?', [req.params.id]);
        console.log(result);

        return  res.json({
            result : true,
            msg : 'Delete Product Successfully',
        })
    } catch (error) {
        console.log(error);
        return  res.json({
            result : false,
            msg : 'Internal Server Error',
        })
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})