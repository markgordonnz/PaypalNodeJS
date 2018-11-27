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

//Set Paypal Values//
paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': 'Af6MHbK1OOOVo15ZiEQSsEDs3LLY6uEhh5LExSkMGVHDIeG3HMSPzIXpO6I8wz1_RxgRgjG7mDVrH8G3',
    'client_secret': 'EL-bb-doJ3RS1EzM6xYurP0JIgwmeuqbFr9_I2yV6lrgiYoXZ6AmoSlSk0HlJJWl9jU6xZKdiYmKiTls'
  });

//Paypal initial Pricing
// start payment process set the JSON information required for API 
//To be refined with value brought through the shopping basket

app.get('/buy' , ( req , res ) => {
    var payment = {
            "intent": "authorize",
	"payer": {
		"payment_method": "paypal"
	},
	"redirect_urls": {
		"return_url": "http://localhost:3000/success",
		"cancel_url": "http://localhost:3000/err"
	},
	"transactions": [{
		"amount": {
			"total": 799.00,
			"currency": "AUD"
		},
		"description": " Initial consultation with Webmanics "
    }]
    
    // Create a transaction method
    }
    createPay( payment ) 
        .then( ( transaction ) => {
            var id = transaction.id; 
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
                    return res.redirect( links[counter].href )
                }
            }
        })
        //catch an error and redirect to an error page
        .catch( ( err ) => { 
            console.log( err ); 
            res.redirect('/err');
        });
}); 







// helper functions 
var createPay = ( payment ) => {
    //"Promise" allows an variable to be created even if the value is not known
    //Instead of an immediate value, the asynchronus can return the variable value at a later stage
  return new Promise( ( resolve , reject ) => {
      paypal.payment.create( payment , function( err , payment ) {
       if ( err ) {
           reject(err); 
       }
      else {
          resolve(payment); 
      }
      }); 
  });
}