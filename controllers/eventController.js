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
  res.render('dashboard', { attendedEvents, hostedEvents });
};

exports.getNewEventPage = async (req, res, next) => {
  // Await that Event.find is ready, then render
  res.render('newevent');
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
  let userIsAttending = false;

  // We also need to know if a logged in user is already attending
  if (res.locals.isUserLoggedIn) {
    userIsAttending = event.attendees.some((person) => {
      return person.equals(req.user._id);
    });
  }

  res.render('event', { event, date, time, userIsAttending });
};

exports.makeNewEvent = async (req, res, next) => {

  const eventInfo = {
    'owner': req.user.id,
    'title': req.body.title,
    'foodtype': req.body.foodtype,
    'price': req.body.price,
    'description': req.body.description
  };
  console.log(eventInfo);
  const newEvent = new Event(eventInfo);
  const event = await newEvent.save();
  req.flash('success', `Event ${event.title} created!`);
  res.redirect('/dashboard');
};

exports.attendEvent = async (req, res, next) => {

  const event = await Event.findById(req.params.id);
  const userIsAttending = event.attendees.some((person) => {
    return person.equals(req.user._id);
  });

  if (userIsAttending) {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { '$pull': { 'attendees': req.user._id } });
    req.flash('success', `You have canceled your attendance to ${updatedEvent.title}.`);
    res.redirect('/');
  } else {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { '$push': { 'attendees': req.user._id } });
    req.flash('success', `You are now attending ${updatedEvent.title} at ${moment(updatedEvent.date).format('LL')}!`);
    res.redirect('/');
  }
};
