const express = require('express');

const app = express();

app.use(express.json());  //middleware for convert from json object to javascript object

let products = [
    {id : 1, name : 'iphone', category : 'test', description : 'testing'},
    {id : 2, name : 'iMac', category : 'test', description : 'testing'},
    {id : 3, name : 'iMac', category : 'test', description : 'testing'},
    {id : 4, name : 'iMac', category : 'test', description : 'testing'},
];
let id = 0;

app.get('/products', (req, res) => {
    res.json({
        result : true,
        msg : 'Get all products successfully',
        data : products
    })
});

app.post('/products', (req, res) => {  //HTTP method POST
    console.log(req.body);  //req.body for get data from user
    id++;
    let newProduct = {
        id : id,
        name : req.body.name,
        category : req.body.category,
        description : req.body.description
    }
    products.push(newProduct);
    res.json({
        result : true,
        msg : 'Create Product Successfully',
        data : newProduct
    })
});

app.put('/products/:id', (req, res) => {
    let product = products.find(p => p.id === Number(req.params.id));
    // console.log(product);

    if(!product){
        res.json({
            result : false,
            msg : 'Product Not found',
        })
        return;
    }

    product.name = req.body.name;    
    product.category = req.body.category;   
    product.description = req.body.description;   
    
    res.json({
        result : true,
        msg : 'Update Product Successfully',
        data : product
    }) 
});

app.delete('/products/:id', (req, res) => {
    let product = products.findIndex(p => p.id === Number(req.params.id));
    console.log(product);

    if(product === -1){
        return  res.json({
            result : false,
            msg : 'Product Not found',
        })
    }

    products.splice(product, 1);
    res.json({
        result : true,
        msg : 'Delete Product Successfully',
    }) 
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})