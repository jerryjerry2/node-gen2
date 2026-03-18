const fs = require('fs');

// fs.readFile('./a.txt', 'utf8',(err, data) => {
//     if(err) console.log(err);
//     // console.log(data.toString());
//     console.log(data);
    
// })

//write
// fs.writeFile('./b.txt', 'Hello Tiger', (err) => {
//     if(err) console.log(err);

//     console.log('Write Sccessfully'); 
// })

//append
// fs.appendFile('./b.txt', '\n Testing Append', (err) => {
//     if(err) console.log(err);
//     console.log('Append Successfully');
// })

// if(fs.existsSync('./b.txt')){
//     //delete
//     fs.unlink('./b.txt', (err) => {
//         if(err) console.log(err);
//         console.log('Deleted');
//     })
// }else{
//     console.log('No file to delete');
// }

// fs.mkdir('./asset', (err) => {
//     if(err) console.log(err);
//     console.log('Folder created');
// })

fs.rmdir('./asset', (err) => {
    if(err) console.log(err);
    console.log('Folder Deleted');
    
    
})