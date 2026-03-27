const express = require('express');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());

app.use(authRoute);

app.listen(3000);