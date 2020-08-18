const express = require('express')
const app = express()

const port = 1234;  // arbitrary port number


// ROUTES
app.get('/', (request, response) => {
    console.log('GET /');
    response.send('The cake is a lie')
})

app.get('/hello', (req, res) => {
    console.log('GET /hello');
    res.send('Hello!')
})

app.get('/index.html', (req, res) => {
    console.log('GET /index.html');
    res.sendFile(__dirname + '/public/index.html')
})


app.get('/fruits', (req, res) => {
    console.log('GET /fruits', req.query);
    let fruits = ['strawberry', 'pear', 'apple', 'banana', 'orange'];
    let index = req.query.index;  // '?index=2' -> { index: 2 }
    let maybeFruit = fruits[index];
    if( maybeFruit ) {
        res.send(maybeFruit);
    } else {
        index = Math.floor(Math.random() * fruits.length);
        res.send(fruits[index]);
    }
})


// Start server
app.listen(port, () => {
    console.log('Web server listening on port ' + port);
})
