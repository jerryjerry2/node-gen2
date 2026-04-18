const projectModel = require('../models/project');
const path = require('path');
const fs = require('fs');
const { createSchema, updateSchema, deleteSchema, updateLogoSchema } = require('../validator/project');

const getAll = async () => {
    let rows = await projectModel.getAll();

    return rows;
}

const create = async (body) => {
    const { error, value } = createSchema.validate(body);

    if(error){
        throw new Error(error.details[0].message);
    }

    let result = await projectModel.create(value);
    let [row] = await projectModel.getById(result);

    return row;
}

const update = async (body) => {
    const { error, value } = updateSchema.validate(body);

    if(error){
        throw new Error(error.details[0].message);
    }

    const user = await projectModel.getById(value.id);
    if(user.length == 0){
        throw new Error('User not found');
    }
    
    await projectModel.update(value);
    const row = await projectModel.getById(value.id);

    return row;
}

const remove = async (body) => {
    const { error, value } = deleteSchema.validate(body);

    if(error){
        throw new Error(error.details[0].message);
    }

    const user = await projectModel.getById(value.id);
    if(user.length == 0){
        throw new Error('User not found');
    }
    
    await projectModel.remove(value);
}

const updateLogo = async (body) => {
    const { error, value } = updateLogoSchema.validate(body.id);

    if(error){
        throw new Error(error.details[0].message);
    }

    if(!body.file){
        throw new Error('Logo is required');
    }
    
    await projectModel.updateLogo({
        logo : body.file.filename,
        id : body.id.id
    });
    const row = await projectModel.getById(body.id.id);
    
    return row;
}

const removeLogo = async (body) => {
    const {error, value} = updateLogoSchema.validate(body);

    if(error){
        throw new Error(error.details[0].message);
    }

    const user = await projectModel.getById(value.id);
    
    if(!user[0].logo){
        throw new Error('Logo not found');
    }
    
    const filePath = path.join(__dirname, '..', 'uploads', user[0].logo);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    await projectModel.removeLogo(value);
    const row = await projectModel.getById(value.id);

    return row;
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    updateLogo,
    removeLogo
}