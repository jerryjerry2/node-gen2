const express = require('express');
const morgan = require('morgan');

const app = express();

// app.use((req, res, next) => {
//     console.log(req.url);
//     console.log(req.method);  
//     next();  
// });

app.use(morgan('dev'));

// app.use((req, res, next) => {
//     let isAuth = true;

//     if(isAuth){
//         next();
//     }else{
//         res.json({
//             msg : 'You need to login'
//         })
//     }
// });

// function isAuth(req, res, next){
//     let isAuth = false;

//     if(isAuth){
//         next();
//     }else{
//         res.json({
//             msg : 'You need to login'
//         })
//     }
// }

app.get('/', (req, res) => {
    res.json({
        name : 'This is homepage'
    })    
});

app.get('/contact', (req, res) => {
    res.json({
        name : 'This is Contact'
    })    
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});