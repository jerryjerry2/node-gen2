const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    host : 'localhost',
    service : 'gmail',
    auth : {
        user : 'chmapikeat@gmail.com',
        pass: 'snaebdbzihrgmaaj'
    }
});

module.exports = transpoter;