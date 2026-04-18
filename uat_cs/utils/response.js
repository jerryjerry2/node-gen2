const success = (res, data = null, msg = 'Success', status = 200) => {
    return res.status(status).json({
        result: true,
        msg,
        data
    });
};

const error = (res, msg = 'Something went wrong', status = 500, errors = null) => {
    return res.status(status).json({
        result: false,
        msg,
        // errors
    });
};

module.exports = {
    success,
    error
};