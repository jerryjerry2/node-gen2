const express = require('express');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());

app.use('/api', authRoute);

app.listen(3000);