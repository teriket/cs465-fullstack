var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const handlebars = require('hbs');

// get modules associated with each service
var indexRouter = require('./appserver/routes/index');
var usersRouter = require('./appserver/routes/users');
var travelRouter = require('./appserver/routes/travel');
const roomsRouter = require('./appserver/routes/rooms');
const newsRouter = require('./appserver/routes/news');
const mealsRouter = require('./appserver/routes/meals');
const contactRouter = require('./appserver/routes/contact');
const aboutRouter = require('./appserver/routes/about');
const apiRouter = require('./app_api/routes/index');
//authentication module
var passport = require('passport');
require('./app_api/config/passport');

var app = express();

//pull the contents from the .env file
require('dotenv').config();

//enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//catch unauthorized login attempts
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res
    .status(401)
    .json({'message' : err.name + ': ' + err.message});
  }
});

// Connect to the database
require('./app_api/models/db');

// view engine setup
app.set('views', path.join(__dirname, 'appserver' ,'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// allow the server to serve static content from the public folder
app.use(express.static('public'));

//initialize authorization module
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// wire routes to controllers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/news', newsRouter);
app.use('/meals', mealsRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/api', apiRouter);

//setup partials for handlebars
handlebars.registerPartials(__dirname + '/appserver/views/partials');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
