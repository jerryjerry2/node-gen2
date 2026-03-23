const pool = require('../config/db');
const productModel = require('../models/productModel');

const getAll = async function() {
    const rows = await productModel.getAll();

    return rows;
}

const create = async function(body){
    let row =  await productModel.create(body);
    let data = productModel.getById(row);
    console.log(row);

    return data;
}

module.exports = {
    getAll,
    create
}