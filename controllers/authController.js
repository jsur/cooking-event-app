const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const User = require('../models/User');

// No need to add error handling, route is wrapped with catchErrors() in index.js
exports.makeNewUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(bcryptSalt);
  const hashPass = await bcrypt.hash(password, salt);

  const newUser = User({
    email,
    password
  });

  const user = await newUser.save();
  req.flash('success', `User ${user.email} created!`);
  res.redirect('/');
};

exports.getLoginForm = (req, res, next) => {
  res.render('login');
};

exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error', 'You have to be logged in to do that!');
  res.redirect('/');
};
