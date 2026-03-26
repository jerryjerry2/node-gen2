const express = require('express');

const productRoute = require('./routes/productRoutes');

const app = express();
app.use(express.json());

app.use(productRoute);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})