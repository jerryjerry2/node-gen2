const _ = require('lodash');


let intervalID = setInterval(() => {
    let num = _.random(1, 10);
    console.log(num);
    
    if(num === 10){
        clearInterval(intervalID);
    }
}, 3000);