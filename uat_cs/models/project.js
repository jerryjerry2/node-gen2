const db = require('../configs/db');

const getAll = async () => {
    let [rows] = await db.query('select * from projects');

    return rows;
}

const getById = async (id) => {
    let [rows] = await db.query('select id, name, logo from projects where id = ?', [id]);

    return rows;
}

const create = async (value) => {
    let arr = [value.name];
    let [result] = await db.query('insert into projects (name) values (?)', arr);

    return result.insertId;
}

const update = async (value) => {
    const arr = [value.name, value.id];

    await db.query('update projects set name = ? where id = ?', arr);
}

const remove = async (value) => {
    await db.query('delete from projects where id = ?', [value.id]);
}

const updateLogo = async (value) => {
    const arr = [value.logo, value.id];
    
    await db.query('update projects set logo = ? where id = ?', arr);
}

const removeLogo = async (value) => {
    await db.query('update projects set logo = null where id = ?', [value.id]);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    updateLogo,
    removeLogo
}