const validate = (schema) => (req, res, next) => {
    const {error, value} = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
    });

    if(error) {
        return res.json({
            message : 'validate error',
            details : error.details.map((d) => d.message)
        })
    }

    req.validatedData = value; // sanitized data
    next();
}

module.exports = validate;