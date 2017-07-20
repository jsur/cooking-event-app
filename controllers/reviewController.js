const Review = require('../models/Review');
const User = require('../models/User');

exports.leaveReview = async (req, res, next) => {

  const author = await User.find({ '_id': req.user._id });

  const reviewInfo = {
    'author': req.user._id,
    'authorname': author[0].firstname + ' ' + author[0].lastname,
    'host': req.params.id,
    'rating': req.body.rating,
    'description': req.body.description
  };

  const review = new Review(reviewInfo);
  await review.save();
  req.flash('success', 'Review saved!');
  res.redirect('/');
};
