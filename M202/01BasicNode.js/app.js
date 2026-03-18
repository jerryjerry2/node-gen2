// let i = 5;
// let name = 'ANT';

// console.log(i);
// console.log(name);
// console.log(global);

// setTimeout(() => {
//     console.log('Hello nodejs');
// }, 3000);

// let count = 0;
// let intervalID = setInterval(() =>{
//     console.log('Hello Interval');
//     count++;

//     if(count == 5){
//         clearInterval(intervalID)
//     }
// }, 1000);

// let i = 10;
// let name = 'ANT';

// function sum(a, b){
//     return a + b;
// }

// function sub(a, b){
//     return a - b;
// }



// module.exports = {
//     sum,
//     sub
// };

//const fs = require('fs');

//Read file from txt
// fs.readFile('./a.txt', 'utf8', (err, data) => {
//     if(err) return;

//     //console.log(data.toString());
//     console.log(data);
// });

//write file
// fs.writeFile('./b.txt', 'Hello ANT', (err) => {
//     if(err) return;
//     console.log('Write Successfully');
// });

//update file
// fs.appendFile('./b.txt', '\n Hello Again', (err) => {
//     if(err) return;
//     console.log('Append Succesfully');
// })

//delete file
// fs.unlink('./b.txt', (err) => {
//     if(err) return;
//     console.log('Delete Successfully');
// })

// if(fs.existsSync('./b.txt')){
//     fs.unlink('./b.txt', (err) => {
//         if(err) return;
//         console.log('Delete Successfully');
//     })
// }else{
//     console.log('No file to delete');
// }


// fs.mkdir('./asset', (err) => {
//     if(err) return;
//     console.log('Folder created');
// })


// fs.rmdir('./asset', {recursive : true },(err) => {
//     if(err) return;
//     console.log('Folder created');
// })

let i = 10;

console.log(10);

function displayName(){
    console.log(123);
    
}

displayName();


module.exports = i;



