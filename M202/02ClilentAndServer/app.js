const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);
    // console.log(res);
    //res.setHeader('Content-Type', 'application/json');
    //res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');
    let url = req.url;
    let path = '';

    switch (url) {
        case '/': path = './index.html';
            res.statusCode = 200;
            break;
        case '/contact': path = './contact.html';
            res.statusCode = 200;
            break;
        default:
            path = './404.html';
            res.statusCode = 404;
            break;
    }
    
    fs.readFile(path, (err, data) => {
        if(err) console.log(err);
        res.end(data);
    });
})

server.listen(3000, () => {
    console.log('server running on port 3000')
})