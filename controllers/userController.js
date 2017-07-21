const User = require('../models/User');
const multer = require('multer');
const upload = multer({ 'dest': './public/uploads' });


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
