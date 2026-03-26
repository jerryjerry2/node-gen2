const categoryModel = require('../models/categoryModel');

const getAll = async function name() {
    const rows = await categoryModel.getAll();

    return rows;
}

const create = async function name(body) {
    const result = await categoryModel.create(body);
    const row = await categoryModel.getById(result);
    console.log(result);
    
    return row;
}

const update = async function (body, id) {
    let row = await categoryModel.getById(id);
    
    if(row.length == 0){
        throw new Error("No Category found");
    }

    await categoryModel.update(body, id);
    row = await categoryModel.getById(id);

    return row;
}

const remove = async function (id) {
    let row = await categoryModel.getById(id);
    if(row.length == 0){
        throw new Error("No Category found");
    }

    await categoryModel.remove(id);
}

module.exports = {
    getAll,
    create,
    update,
    remove,
}