//Load Modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const pug = require('pug');
const app = express();
var paypal = require('paypal-rest-sdk');



//Configure App settings//
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use('/images', express.static('images'));
app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/js', express.static('js'));

//set app listening port
app.listen( 3000 , () => {
    console.log(' app listening on 3000 '); 
})

//render pages//
//This will render the home page, index.pug
app.get('/', function (req, res) {
    res.render('index');
})

// renders the success page on payment completed
app.get('/success', function (req, res) {
    res.render('success');
})

//If the payment fails, this page is rendered
app.get('/error', function (req, res) {
    res.render('error');
})
