const pool = require('../config/db');

const getAll = async (req, res) => {
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
}

module.exports = {
    getAll
}