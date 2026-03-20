const express = require('express');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(express.json());

app.use(productRoutes);
app.use(categoryRoutes);


app.listen(3000, () => {
    console.log('Server running on port 3000');
})