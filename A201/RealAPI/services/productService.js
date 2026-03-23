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

const update = async function(body, id) {
    const result = await productModel.update(body, id);
    const rows = await productModel.getById(id);
    console.log(rows);
    
    return rows;
}

const remove = async function(id){
    await productModel.remove(id);
}

module.exports = {
    getAll,
    create,
    update,
    remove
}