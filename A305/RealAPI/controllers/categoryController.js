const pool = require('../config/db');
const categoryService = require('../services/categoryService');

const getAll = async (req, res) => {
    try {
        const rows = await categoryService.getAll();

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

const create = async (req, res) => {
    try {
        let result = await categoryService.create(req.body);
        
        res.json({
            result : true,
            msg : 'Create Category Successfully',
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
        const result = await categoryService.update(req.body, req.params.id);
        
        return  res.json({
            result : true,
            msg : 'Update Category Successfully',
            data : result[0]
        })

    } catch (error) {
        console.log(error);
        return  res.json({
            result : false,
            msg : error.message,
        })
    }
}

const remove = async (req, res) => {
    try {       
        await categoryService.remove(req.params.id);

        return res.json({
            result : true,
            msg : 'Delete Category successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result : false,
            msg : error.message
        })
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove,
}