const express = require('express');
const productRoute = require('./routes/productRoutes');
const categoryRoute = require('./routes/categoryRoutes')

const app = express();
app.use(express.json());

app.use(productRoute);
app.use(categoryRoute);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})