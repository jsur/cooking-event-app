const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  'email': {
    'type': String,
    'required': 'Email is required!'
  },
  'password': {
    'type': Number,
    'required': 'Password is required!'
  },
  'username': String,
  'firstname': String,
  'lastname': String,
  'events_attending': [{'type': Schema.Types.ObjectId, 'ref': 'Event'}],
  'events_hosting': [{'type': Schema.Types.ObjectId, 'ref': 'Event'}],
  'preferences': [String]
}, {
  'timestamps': {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
