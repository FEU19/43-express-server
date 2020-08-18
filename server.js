const express = require('express')
const app = express()

const port = 1234;  // arbitrary port number


// MIDDLEWARE
// use-funktionen registrerar en middleware function
// 3 parametrar -> vanlig middleware
let logger = (req, res, next) => {
    // a "real" logger function would save data to a file
    console.log(`LOGGER: ${req.method} ${req.url}`);

    next();  // fortsätt med nästa middleware
}
app.use( logger );

let auth = (req, res, next) => {
    // Let's pretend another.html is secret and cannot be accessed by normal visitors
    if( req.url.includes('another.html') ) {
        res.send('Another.html is forbidden');
    } else {
        next();
    }
}
app.use( auth );

app.use( express.static(__dirname + '/public') )
app.use( express.static(__dirname + '/static') )


// ROUTES
app.get('/', (req, res) => {
    console.log('GET /  (index.html)');
    res.sendFile(__dirname + '/public/index.html');
})

// samma route som den ovanför - kommer aldrig att köras
app.get('/', (request, response) => {
    console.log('GET /  (cake)');
    response.send('The cake is a lie')
})

app.get('/hello', (req, res) => {
    console.log('GET /hello');
    res.send('Hello!')
})



let fruits = ['strawberry', 'pear', 'apple', 'banana', 'orange'];

app.get('/fruits', (req, res) => {
    console.log('GET /fruits', req.query);
    let index = req.query.index;  // '?index=2' -> { index: 2 }
    let maybeFruit = fruits[index];
    if( maybeFruit ) {
        res.send(maybeFruit);
    } else {
        index = Math.floor(Math.random() * fruits.length);
        res.send(fruits[index]);
    }
})

app.get('/fruits/add', (req, res) => {
    console.log('GET /fruits/add', req.query);
    let name = req.query.name;
    fruits.push(name);
    // push lägger till nya objekt SIST i en array
    // shift lägger till nya objekt FÖRST i en array
    res.send(`Added "${name}" to fruit list.`)
})
app.get('/fruits/add/:newFruit', (req, res) => {
    console.log('GET /fruits/add/:newFruit', req.params);
    let name = req.params.newFruit;
    fruits.push(name);
    // push lägger till nya objekt SIST i en array
    // shift lägger till nya objekt FÖRST i en array
    res.send(`Added "${name}" to fruit list.`)
})

app.get('/cause-error', (req, res) => {
    // throw new Error('example')
    let notAFunction = null;
    notAFunction();
})


// ERROR HANDLING MIDDLEWARE
// måste ligga sist - undantaget som bekräftar regeln
// 4 parametrar -> error handling middleware
app.use( (error, req, res, next) => {
    console.log('Error handling', error);
    res.status(500).send('Internal server error');
})



// Start server
app.listen(port, () => {
    console.log('Web server listening on port ' + port);
})
