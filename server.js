const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerHelper('getCurrentYear', function () {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase();
});

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(function (req, res, next){
    var now = new Date().toString();
    log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', function(error){
        if(error){
            console.log('Unable to append to server log: ' + error);
        }
    });
    next();
});

// Uncomment next section for maintenance
// app.use(function(req,res,next){
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // console.log('Getting request from the server');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello, Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    // console.log('Getting request from the server');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

