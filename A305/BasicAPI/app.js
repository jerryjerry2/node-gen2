const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); //convert from json object to javascript

let products = [];
let id = 0;

app.get('/products', (req, res) => {
    res.json({
        result: true,
        msg: 'Get all products successfully',
        data: products
    })
});

app.post('/products', (req, res) => {
    console.log(req.body); // use for get req body from user
    id++;
    let newProduct = {
        id: id,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    }
    products.push(newProduct);
    res.json({
        result: true,
        msg: 'Create Product Successfully',
        data: newProduct
    })
});

app.put('/products/:id', (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);

    for (const product of products) {
        console.log('id from array ', element.id);
        console.log('id from request ', req.params.id);
        //console.log(element);

        if (Number(req.params.id) === element.id) {
            console.log(element);
            element.name = req.body.name;
            element.category = req.body.category;
            element.description = req.body.description;
            res.json({
                result: true,
                msg: 'Update Product Successfully',
                data: element
            })
        }
    };

    res.json({
        result: false,
        msg: 'No Product Found',
    })
});

app.delete('/product/:id', (req, res) => {
    //console.log(req.params.id);
    const product = products.findIndex(p => p.id === Number(req.params.id));
    console.log(product);

    if (product === -1) {
        return res.json({
            result: false,
            msg: 'No Product Found',
        })
    }

    products.splice(product, 1);
    res.json({
        result: true,
        msg: 'Delete Product Successfully',
    
    })
});

app.listen(3000, () => {
    console.log('Server Running on port 3000');
})