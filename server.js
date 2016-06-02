var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

//routes
app.get('/home', function(req, res){
  res.render('home');
});

//error handlers
//404 catch-all handler(middleware)
app.use(function(req, res, next){
res.status(404);
res.send('404');
});
//500 error handler(middleware)
app.use(function(req, res, err, next){
  console.error(err.stack);
  res.status(500);
  res.send('500');
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
