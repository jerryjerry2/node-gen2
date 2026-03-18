const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // res.setHeader('Content-Type', 'text/plain');
    //res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Type', 'text/html');

    let url = req.url;
    let path = '';
    
    switch (url) {
        case '/': path = './index.html'
            res.statusCode = 200;
            break;
        case '/about': path = './contact.html'
            break;
    
        default:
            path = './404.html'
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err) console.log(err);
        res.end(data);
    }) 
})

server.listen(3000, () => {
    console.log('Server running on port 3000');
})