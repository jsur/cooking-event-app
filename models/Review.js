const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  'author': {'type': Schema.Types.ObjectId, 'ref': 'User'},
  'authorname': String,
  'host': {'type': Schema.Types.ObjectId, 'ref': 'User'},
  'rating': Number,
  'description': String
}, { 'timestamps': {'createdAt': 'created_at'} });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
