const express = require('express');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());

require('dotenv').config();

app.use('/api', authRoute);

app.listen(process.env.PORT);