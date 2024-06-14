const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const SERVER_PORT = 3000;

//Middleware Function
const myMiddleware = (req, res, next) => {
    console.log('Hello 01');
    console.log('Time:', Date.now());
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.originalUrl);
    next();
}

//Global Middleware
app.use(myMiddleware);
//Route Middleware
app.use("/query", (req, res, next) => {
    console.log('Query Middleware');
    next();
})

app.use(express.static(__dirname + '/views'));

// Hello World
app.get('/hello', (req, res) => {
    res.send('Hello World');
});

// About Page
app.get('/about', (req, res) => {
    res.send('About Page');
});

// Get Pets
app.use(bodyParser.json());
let pets = [
    { id: 1, name: 'Doggy', description: 'aw aw aw' },
    { id: 2, name: 'Catty', description: 'meow meow meow' },
    { id: 2, name: 'Birdy', description: 'twit twit twit' }
];
// app.get('/pets', (req, res) => {
//     res.json(pets);
// });

// Get Pet by ID
app.get('/pets/:id', (req, res) => {
    console.log('Hello Pets 01');
    const itemId = parseInt(req.params.id);
    const pet = pets.find(i => i.id === itemId);
    if (!pet) {
        res.status(404).json({ message: 'Pet went away' });
    }
    res.send(pet);
});

//Param Route
//localhost:3000/contact/pritesh/patel
app.get('/contact/:fnm/:lnm', (req, res) => {
    console.log(req.params);
    res.send('Contact Page: ' + req.params.fnm + ' ' + req.params.lnm);
})

//Query Route
//localhost:3000/query?fnm=pritesh&lnm=patel
app.get('/query', (req, res) => {
    console.log(req.query);
    res.send('Query Page: ' + req.query.fnm + ' ' + req.query.lnm);
})

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});