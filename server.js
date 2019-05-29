const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + "\n", (err) => {
        if (err) console.log("Unable to append to server");
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.get('/', (req, res) => {
    res.render('page.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to our website"
    });
});

app.get('/about', (req, res) => {
    res.render('page.hbs', {
        pageTitle: "About Page"
    });
})

app.get('/help', (req, res) => {
    res.render('page.hbs', {
        pageTitle: "Help Page"
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});