const productModel = require('../models/productModel');

const getAll = async () => {
    let rows = await productModel.getAll();

    return rows;
}

const getById = async (id) => {
    let rows = await productModel.getById(id);

    return rows;
}

const create = async (body) => {
    const result = await productModel.create(body);
    const row = await productModel.getById(result);

    return row;
}

const remove = async (id) => {
    //Check Product ID
    let check_id = await productModel.getById(id);
    if (check_id.length == 0) {
        throw new Error("Product Not Found");
    }

    //Product Exist
    let isExist = await productModel.getExistProduct(id);
    if (isExist.length > 0) {
        throw new Error("Cannot delete this product because it is already used in an order");
    }

    await productModel.remove(id);
}

module.exports = {
    getAll,
    remove,
    create
}