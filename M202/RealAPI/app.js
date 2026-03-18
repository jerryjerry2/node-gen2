const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'mineadub',
    database : 'ecommerce202',
});

app.get('/products',async (req, res) => {
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
});

app.post('/products', async (req, res) => {
    try {
        let body = req.body;
        let arr = [body.name, body.category, body.description];
        let [result] = await pool.query('insert into products (name, category, description) values (?, ?, ?)', arr);
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
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})