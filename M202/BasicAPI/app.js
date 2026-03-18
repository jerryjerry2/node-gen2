const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());  //middleware for convnert from json to javascript object


let products = [
    {id : 1, name : 'test1', category : 'hello', description : 'test'},
    {id : 2, name : 'test2', category : 'hello', description : 'test'},
    {id : 3, name : 'test3', category : 'hello', description : 'test'},
];
let id = 0;

app.get('/products', (req, res) => {
    res.json({
        result : true,
        msg : 'Get all product successfully',
        data : products
    })
});

app.post('/products', (req, res) => {  //http method post for handle post request
    console.log(req.body);  // for get value from user request
    id++;
    let newProduct = {
        id : id,
        name : req.body.name,
        category : req.body.category,
        description : req.body.description,
    }
    products.push(newProduct);
    res.json({
        result : true,
        msg : 'Create Product Successfully',
        json : newProduct
    })
});

app.put('/products/:id', (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    let product = products.find(p => p.id === Number(req.params.id));
    
    if(!product){
        return res.json({
            result : false,
            msg : 'Product Not found'
        })
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.description = req.body.description;
    res.json({
        result : true,
        msg : 'Update Product Successfully',
        json : product
    })
});

app.delete('/products/:id', (req, res) => {
    let product = products.findIndex(p => p.id === Number(req.params.id));
    console.log(product);

    if(product === -1){
        return res.json({
            result : false,
            msg : 'Product Not found'
        })
    }
    
    products.splice(product, 1);
    res.json({
        result : true,
        msg : 'Delete Product Successfully',
    })
});

app.listen(3000, () => {
    console.log('Server Running on port 3000');
})