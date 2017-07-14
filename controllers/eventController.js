const Event = require('../models/Event');

// With exports.something we don't need to use module.exports in the end of the file
exports.getMainPage = async (req, res, next) => {
  // Await that User.find is ready, then render
  // const events = await Event.find().limit(6);
  const events = [{
    'title': 'Test event',
    'foodtype': 'Italian',
    'price': '10'
  }, {
    'title': 'Another event',
    'foodtype': 'German',
    'price': '5'
  }, {
    'title': 'Third event with looooooooooooooong name',
    'foodtype': 'Veggie vegan',
    'price': '20'
  }];

  res.render('main', { events });
};

exports.getSignUpForm = (req, res, next) => {
  res.render('signup');
};
