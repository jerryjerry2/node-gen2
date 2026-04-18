const express = require('express');
const path = require('path');
const projectRoutes = require('./routes/projects');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('dotenv').config();

app.use('/api', projectRoutes);

app.use((err, req, res, next) => {
    if (err.name === 'MulterError') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

app.listen(3000);