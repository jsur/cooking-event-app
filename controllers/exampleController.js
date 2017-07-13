const User = require('../models/User');

// With exports.something we don't need to use module.exports in the end of the file
exports.getExamplePage = async (req, res, next) => {

  const users = await User.find();
  res.render('index', {
    'title': 'This page is rendered in exampleController',
    'ptag': 'In this sentence we send info to p tag from the controller and pug uses #{ptag} to show our data',
    users
  });
};

exports.getSignUpForm = (req, res, next) => {
  res.render('signup');
};
