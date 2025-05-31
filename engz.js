// const express = require('express')
// const app = express();
// app.set("view engine", "ejs");
// app.get('/',(req ,res)=> {
//     console.log('here')
//     res.render(('./index.js' ,(err,data) =>{
//         if(err){
//             console.log(err);
//             res.end();

//         } else{
//             res.writeHead(data);
//             res.end();
//         }
//     } ))
// })


// app.listen(3000,() => {
//     console.log('server is running on port 3000');
// });


const express = require('express');
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Route to render the index.ejs template
app.get('/', (req, res) => {
    console.log('here');
    res.render('index', (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(html);
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

