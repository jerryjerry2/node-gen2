const projectService = require('../services/projects');
const resObj = require('../utils/response');

const getAll = async (req, res) => {
    try {
        let rows = await projectService.getAll();

        rows.forEach(item => {
            if (item.logo) {
                item.logo = `${process.env.BASE_URL}${item.logo}`;
            }
        });
        
        return resObj.success(res, rows, 'Get all Project', );
    } catch (err) {
        console.log(err);
        return resObj.error(res, err.message)
    }
}

const create = async (req, res) => {
    try {
        const result = await projectService.create(req.body);

        return resObj.success(res, result, 'Create Project Successfully');
    } catch (err) {
        console.log(err);
        return resObj.error(res, err.message);
    }
}

const update = async (req, res) => {
    try {
        let result = await projectService.update({
            id : req.params.id,
            name : req.body.name,
        });

        result.forEach(item => {
            if (item.logo) {
                item.logo = `${process.env.BASE_URL}${item.logo}`;
            }
        });
        
        return resObj.success(res, result, 'Update Project Successfully');
    } catch (err) {
        console.log(err);
        return resObj.error(res, err.message);
    }
}

const remove = async (req, res) => {
    try {
        await projectService.remove(req.params);

        return resObj.success(res, [] ,'Delete Project Successfully');
    } catch (err) {
        console.log(err);
        return resObj.error(res, err.message);
    }
}

const updateLogo = async (req, res) => {
    try {
        const result = await projectService.updateLogo({
            file : req.file,
            id : {id : req.params.id}
        });

        result.forEach(item => {
            if (item.logo) {
                item.logo = `${process.env.BASE_URL}${item.logo}`;
            }
        });

        return resObj.success(res, result, 'Update Project Logo Successfully');
    } catch (err) {
        console.log(err);
        return resObj.error(res, err.message);
    }
}

const removeLogo = async (req, res) => {
    try {
        const result = await projectService.removeLogo(req.params);

        return resObj.success(res, result ,'Delete Logo Successfully');
    } catch (err) {
        console.log(err);
        return resObj.error(res, err.message);
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    updateLogo,
    removeLogo
}