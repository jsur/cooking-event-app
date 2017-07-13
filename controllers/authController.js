const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const User = require('../models/User');

exports.makeNewUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(bcryptSalt);
  const hashPass = await bcrypt.hash(password, salt);

  const newUser = User({
    username,
    password
  });

  const user = await newUser.save();
  req.flash('success', `User ${user.username} created!`);
  res.redirect('/');
};
