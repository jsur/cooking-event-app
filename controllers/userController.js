const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.render('profile', { user });
};

exports.updateUser = async (req, res, next) => {

  const userData = {
    'email': req.body.email,
    'firstname': req.body.firstname,
    'lastname': req.body.lastname
  };

  const updateUser = await User.findByIdAndUpdate(req.user.id, userData);
  req.flash('success', 'Profile info updated!');
  res.redirect('/');
};
