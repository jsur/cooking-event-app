const Event = require('../models/Event');
const User = require('../models/User');
const moment = require('moment');

// With exports.something we don't need to use module.exports in the
// end of the file
exports.getMainPage = async (req, res, next) => {
  // Await that Event.find is ready, then render
  const events = await Event.find().limit(6);
  res.render('main', { events });
};

exports.getSearchPage = async (req, res, next) => {
  // Await that Event.find is ready, then render
  res.render('search');
};

exports.getDashboard = async (req, res, next) => {
  // Await that Event.find is ready, then render
  const attendedEvents = await Event.find({ 'attendees': req.user.id }).limit(3);
  const hostedEvents = await Event.find({ 'owner': req.user.id }).limit(3);
  // const events = await Event.find({ 'attendees': req.user.id });
  // if (events.length > 0) {
  //   events.limit(3);
  // }
  // else {
  //   e
  // }
  res.render('dashboard', { attendedEvents, hostedEvents });
};


exports.getEventsNearCoordinate = async (req, res, next) => {

  const events = await Event.find({
    'location': {
      '$near': {
        '$geometry': {
          'type': 'Point',
          // mongoose wants lng first
          'coordinates': [req.query.lng, req.query.lat]
        },
        // 20 km
        '$maxDistance': 20000
      }
    }
  }).select('name title description location price foodtype');

  res.json(events);

};

exports.getEventWithId = async (req, res, next) => {

  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  const date = moment(event.date).format('LL');
  const time = moment(event.date).format('LT');

  res.render('event', { event, date, time });
};
