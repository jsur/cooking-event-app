const Review = require('../models/Review');

exports.leaveReview = async (req, res, next) => {

  // res.send({'body': req.body, 'user': req.user, 'host': req.params});

  const reviewInfo = {
    'author': req.user._id,
    'host': req.params.id,
    'rating': req.body.rating,
    'description': req.body.description
  };

  const review = new Review(reviewInfo);
  await review.save();
  req.flash('success', 'Review saved!');
  res.redirect('/');
};
