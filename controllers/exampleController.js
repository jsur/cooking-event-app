const User = require('../models/User');

//With exports.something we don't need to use module.exports in the end of the file
exports.getExamplePage = (req, res) => {

  User.find({}, (err, users) => {
    if (err) {
      return next(err);
  }
  res.render('index', {
    title: 'This page is rendered in exampleController',
    ptag: 'In this sentence we send info to p tag from the controller and pug uses #{ptag} to show our data',
    users
    });
  });
};

exports.getSignUpForm = (req, res) => {
  res.render('signup');
}
