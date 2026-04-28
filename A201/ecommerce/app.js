const express = require('express');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());
require('dotenv').config();

app.use('/api/auth', auth);

app.listen(3000);
