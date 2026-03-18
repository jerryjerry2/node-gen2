const fs = require('fs');

// fs.readFile('./a.txt', 'utf8',(err, data) => {
//     if(err) console.log(err);
//     //console.log(data.toString());
//     console.log(data);
// })

//write
// fs.writeFile('./b.txt', 'Hello world', (err) => {
//     if(err) console.log(err);
//     console.log('Write Successfully');
// })

// fs.appendFile('./b.txt', '\nNew content', (err) => {
//     if(err) console.log(err);
//     console.log('Append Successfully');
// })

// if(fs.existsSync('./b.txt')){
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

fs.rm('./asset', {recursive : true},(err) => {
    if(err) console.log(err);
    console.log('Folder deleted');
})