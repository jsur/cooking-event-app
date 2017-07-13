const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  'username': String,
  'password': {
    'type': Number,
    'required': 'Password is required!'
  },
  'events_attending': [Schema.Types.ObjectId],
  'events_hosting': [Schema.Types.ObjectId],
  'preferences': [String]
}, {
  'timestamps': {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
