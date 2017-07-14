const User = require('../models/User');

// With exports.something we don't need to use module.exports in the end of the file
exports.getExamplePage = async (req, res, next) => {
  // Await that User.find is ready, then render
  const users = await User.find();
  res.render('main');
};

exports.getSignUpForm = (req, res, next) => {
  res.render('signup');
};
