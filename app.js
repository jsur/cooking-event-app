// Express
const express = require('express');
const app = express();
// Node internal modules
const path = require('path');
const fs = require('fs');
//  Middleware
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// Get content from .env file
require('dotenv').config({'path': '.env'});
// Routes
const routes = require('./routes/index');
// Database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
// Handlers
const errorHandlers = require('./handlers/errorHandlers');
const User = require('./models/User');

app.use(session({
  'secret': process.env.SECRET,
  'resave': false,
  'saveUninitialized': false
}));

// Passport auth handling

// serialize sessions
passport.serializeUser((user, next) => {
  console.log('serialize', user);
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findOne({ '_id': id }, (err, user) => {
    next(err, user);
  });
});

// use local strategy
passport.use(new LocalStrategy({
  'usernameField': 'email',
  'passwordField': 'password'
}, (email, password, next) => {
  console.log('LocalStrategy', email, password);
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { 'message': 'Unknown user' });
    }
    /*
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { 'message': 'Invalid password' });
    }*/

    return next(null, user);
  });
})
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), {'flags': 'a'});
app.use(morgan('dev', {'stream': accessLogStream}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Flash messages
app.use(flash());

// Make things available in Pug templates and routes:
//  Flash
//  isUserLoggedIn
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  if (req.session.currentUser) {
    res.locals.isUserLoggedIn = true;
  } else {
    res.locals.isUserLoggedIn = false;
  }
  next();
});

// Go to routes
app.use('/', routes);

// If 404, go to error handler
app.use(errorHandlers.notFound);

// if Mongo validation errors, go to error handler
app.use(errorHandlers.flashValidationErrors);

// Otherwise throw error, we're in shit now.
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
