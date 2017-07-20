const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const eventSchema = new Schema({
  'owner': [{'type': Schema.Types.ObjectId, 'ref': 'User'}],
  'title': String,
  'foodtype': [String],
  'capacity': Number,
  'price': Number,
  'description': String,
  'date': {
    'type': Date,
    'default': Date.now
  },
  'location': { 'type': { 'type': String }, 'coordinates': [Number] },
  'address': String,
  'attendees': [{'type': Schema.Types.ObjectId, 'ref': 'User'}],
  'image': {
    'name': String,
    'path': String
  }
}, {
  'timestamps': {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  }
}, {
  'toJSON': { 'virtuals': true },
  'toObject': { 'virtuals': true }
});

eventSchema.index({ 'location': '2dsphere' });

eventSchema.virtual('placesLeft').get(function () {
  if (this.capacity && this.attendees) {
    return this.capacity - this.attendees.length;
  }

  return this.capacity;
});

eventSchema.virtual('isPastEvent').get(function () {
  if (this.date < moment()) {
    return true;
  }

  return false;
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
