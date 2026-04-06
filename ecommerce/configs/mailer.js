const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host : 'localhost',
    service : 'gmail',
    auth : {
        user : "chmapikeat@gmail.com",
        pass : "qmcbrxjnmflkvpux"
    }
});

module.exports = transporter;