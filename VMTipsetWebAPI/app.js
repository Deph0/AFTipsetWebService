var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');

var config = require('./config.json');

var index = require('./routes/index');
var users = require('./routes/users');
var resultmatches = require('./routes/resultmatches.js');
var resultteams = require('./routes/resultteams.js');
var resultscorers = require('./routes/resultscorers.js');
var result = require('./routes/result.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection(config.database);
	connection.connect();
	next();
});
app.use('/', index);
app.use('/api/v1/users', users);
app.use('/api/v1/result/matches', resultmatches);
app.use('/api/v1/result/teams', resultteams);
app.use('/api/v1/result/scorers', resultscorers);
app.use('/api/v1/result', result);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var server = http.createServer(app);
server.listen(4001);