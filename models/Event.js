const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  'owner': [Schema.Types.ObjectId],
  'title': String,
  'foodtype': [String],
  'price': Number,
  'description': String,
  'date': {
    'type': Date,
    'default': Date.now
  },
  'location': {
    'type': String,
    'coordinates': [Number]
  },
  'attendees': [Schema.Types.ObjectId],
  'image': {
    'name': String,
    'path': String
  }
}, {
  'timestamps': {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
