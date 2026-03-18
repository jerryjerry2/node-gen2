// // // const app = require('./app');
// // const {sum, sub} = require('./app');  //distrcuting object
// // const os = require('os');

// // // console.log(name);
// // // console.log(app.name);

// // console.log(sum);
// // console.log(sub);



// // console.log(os.platform());
// // console.log(os.homedir());
// // console.log(os.version);

// const fs = require('fs');

// const dirName = './myFolder';
// const fileName = 'myFolder/hello.txt';

// if (!fs.existsSync(dirName)) {
//     // Async create directory
//     fs.mkdir(dirName, (err) => {
//         if (err) return console.log(err);
//         console.log('Directory created.');

//         fs.writeFile(fileName, 'Hello! This file was created.', (err) => {
//             if (err) return console.log(err);
//             console.log('File created inside directory.');
//         });
//     });

// } else {
//     fs.rm(dirName, {recursive : true},(err) => {
//         if (err) return console.log(err);
//         console.log('Directory removed.');
//     });

// }



const app = require('./app');



