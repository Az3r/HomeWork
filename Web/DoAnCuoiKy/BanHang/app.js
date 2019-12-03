require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var session = require('express-session');

var expressLayouts = require('express-ejs-layouts');

var passport = require('passport');


//user route area
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandRouter = require('./routes/brands');
var cataloryRouter = require('./routes/catalory');
var productRouter = require('./routes/product');
// admin route area
var adminsRouter = require('./routes/admins');

var app = express();

require('./model/passport_config')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

  app.use(session({
  secret: 'process.env.Secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

//routing direction
app.post('/login.html', (req, res, next) => { passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login.html'})(req, res, next);});
app.post('/admin/login.html', (req, res, next) => { passport.authenticate('local', {successRedirect: '/admin/dashboard.html', failureRedirect: '/admin/login.html'})(req, res, next);});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brands', brandRouter);
app.use('/catolory', cataloryRouter);
app.use('/product', productRouter);


app.use('/admin',adminsRouter);

//app.set('layout', 'index');


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
