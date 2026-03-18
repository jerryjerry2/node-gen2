const express = require('express');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

//app.use(express.static('views'))

app.get('/', async (req, res) => {
    fs.readFile('./views/index.html', 'utf8',(err, data) => {
        //res.setHeader('Content-Type', 'text/html');
       
        res.send(data);
    })
    // let result = await axios.get('https://fakestoreapi.com/products');
    // console.log(result.data);
    

    // res.json({
    //     result : true,
    //     msg : 'Get all successfully',
    //     data : result.data
    // })
})

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
    
    
})

app.listen(3000, () => {
    console.log('Server is run on port 3000');
});