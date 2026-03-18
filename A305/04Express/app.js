const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
    //res.send('<h1>Welcome to homepage</h1>');
    //res.sendFile(__dirname + '/index.html');
    // res.json({
    //     name : 'Welcome to API'
    // })
    let result = await axios.get('https://fakestoreapi.com/products');
    console.log(result);
    

    res.json({
        result : true,
        msg : 'Fetch successfully',
        data : result.data
    })
});

app.get('/contact', (req, res) => {
    console.log('Contact');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})