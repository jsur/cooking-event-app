const User = require('../models/User');
const multer = require('multer');
const upload = multer({ 'dest': '../public/uploads' });


exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.render('profile', { user });
};

exports.updateUser = async (req, res, next) => {

  const userData = {
    'email': req.body.email,
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'image': {'name': req.file.filename, 'path': `/uploads/${req.file.filename}`}
  };

  const updateUser = await User.findByIdAndUpdate(req.user.id, userData);
  req.flash('success', 'Profile info updated!');
  res.redirect('/');
};
