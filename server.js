const express = require('express')
const app = express()

const port = 1234;  // arbitrary port number


app.get('/', (request, response) => {
    console.log('GET /');
    response.send('The cake is a lie')
})

app.get('/hello', (req, res) => {
    console.log('GET /hello');
    res.send('Hello!')
})


app.listen(port, () => {
    console.log('Web server listening on port ' + port);
})
