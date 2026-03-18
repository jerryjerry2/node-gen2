const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
    // console.log('Welcome to Express');
    // res.send('<h1>Welcome to homepage</h1>')
    //res.sendFile(__dirname + '/index.html');
    // res.json({
    //     msg : 'Welcome to API'
    // })
    // const result = await axios.get('https://fakestoreapi.com/products');
    // console.log(result);

    // res.json({
    //     result : true,
    //     msg : 'Fetch Successfully',
    //     data : result.data
    // })
    res.json({
        randomNumber : 1
    })
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})