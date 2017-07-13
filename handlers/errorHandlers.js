// Implementation from Wes Bos' course https://learnnode.com

/*
  Catch Errors Handler

  With async/await, we need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our
  express middleware with next()
*/

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

// Not found error handler

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

/*
  MongoDB Validation Error Handler

  Detect if there are mongodb validation errors that we can
  nicely show via flash messages
*/

exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) {
    return next(err);
  }
  // validation errors look like
  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach((key) => {
    req.flash('error', err.errors[key].message);
  });
  res.redirect('back');
};
