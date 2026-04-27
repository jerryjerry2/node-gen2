
const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly : false,
        // allowUnknown : true
    })
    
    if(error){
        return res.json({
            message : 'Invalid Field',
            details : error.details.map((d) => d.message)
        })
    }

    req.validData = value;
    next();
}

module.exports = validate;