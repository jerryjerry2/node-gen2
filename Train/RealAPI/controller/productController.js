const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : "localhost",
    user : 'root',
    password : 'mineadub',
    database : 'ecommerce305'
});

let getAll = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from products');

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

module.exports = {
    getAll
}