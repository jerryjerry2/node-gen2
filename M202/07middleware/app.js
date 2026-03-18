const express = require('express');
const morgan = require('morgan');

const app = express();

// //User Defined Middleware
// app.use((req, res, next) => {
//     console.log(req.url);
//     console.log(req.method);
//     next();
// })

// //Third party package middleware
// app.use(morgan('tiny'));

// app.use((req, res, next) => {
//     let isAuth = false;

//     if(isAuth){
//        next(); 
//     }else{
//         res.json({
//             msg : 'You need to login'
//         })
//     }
// })

// function isAuth(req, res, next){
//     let isAuth = true;

//     if(isAuth){
//        next(); 
//     }else{
//         res.json({
//             msg : 'You need to login'
//         })
//     }
// }

let count = 0; 
app.use((req, res, next) => {
    count++;
    console.log(count);

    if(count > 3){
        res.json({msg : 'We block your request'});
    }else{
        next();
    }
})

app.get('/', (req, res) => {
    res.json({
        msg : 'Homepage'
    })
});

app.get('/contact',(req, res) => {
    res.json({
        msg : 'Contact'
    })
});



app.listen(3000, () => {
    console.log('Server running on port 3000');
})