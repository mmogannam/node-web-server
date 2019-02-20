const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/partials');
app.set('view engine','hbs');

//middleware to create a maintenance page. next() is not called
//app.use((req,res,next)=>{
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

//create some middleware to create a logging feature
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});



hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
})

//handle get method
app.get('/', (req,res) => {
  res.render('home.hbs',{pageTitle: 'Home Page',
                          welcomeMessage: 'Welcome Home!'
                        });
});

//render handlebars template
app.get('/about', (req,res) => {
  res.render('about.hbs',{pageTitle: 'About Page'});
});

app.get('/bad', (req,res) => {
  res.send({
    error: 'bad request'
  });
});


app.listen(3000, () =>{
  console.log('server is up on port 3000')
});
