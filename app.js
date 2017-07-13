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
// Get content from .env file
require('dotenv').config({'path': '.env'});
// Routes
const routes = require('./routes/index');
// Database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
// Handlers
const errorHandlers = require('./handlers/errorHandlers');

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

app.use(session({
  'secret': process.env.SECRET,
  'resave': false,
  'saveUninitialized': false
}));

// Passport auth handling


// Flash messages
app.use(flash());

// Make flash useable in Pug templates
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
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
