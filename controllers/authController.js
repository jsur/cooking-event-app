const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const User = require('../models/User');
const multer = require('multer');
const upload = multer({ 'dest': '../public/uploads/' });

// No need to add error handling, route is wrapped with catchErrors() in index.js
exports.makeNewUser = async (req, res, next) => {

  const userInfo = {
    'email': req.body.email,
    'password': '',
    'firstname': req.body.firstname,
    'lastname': req.body.lastname
  };

  const salt = await bcrypt.genSalt(bcryptSalt);
  const hashPass = await bcrypt.hash(userInfo.password, salt);
  userInfo.password = hashPass;

  const newUser = User(userInfo);
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

exports.validateSignUpInfo = async (req, res, next) => {
  // Here we use express-validator functions that are available in req object
  req.checkBody('email', 'Email is not valid.').isEmail();
  req.checkBody('password', 'Password can\'t be empty.').notEmpty();
  req.checkBody('passwordconfirm', 'Given passwords do not match.').equals(req.body.password);

  const errors = await req.getValidationResult();

  if (errors.array().length > 0) {
    const errorArray = errors.array();
    req.flash('error', errorArray.map((err) => {
      return err.msg;
    }));
    // req.body given to template so that the user does not have to refill all fields
    res.render('login', { 'flashes': req.flash(), 'body': req.body });

    return;
  }
  next();
};
