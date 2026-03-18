const _ = require('lodash');

let internvalID = setInterval(() => {
    let ranNum = _.random(1, 10);
    console.log(ranNum);
    
    if(ranNum == 10){
        clearInterval(internvalID);
    }
}, 3000)