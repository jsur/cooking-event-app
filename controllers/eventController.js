const Event = require('../models/Event');
const User = require('../models/User');
const Review = require('../models/Review');
const moment = require('moment');
const multer = require('multer');
const upload = multer({ 'dest': './public/uploads' });

// With exports.something we don't need to use module.exports in the
// end of the file
exports.getMainPage = async (req, res, next) => {
  // Await that Event.find is ready, then render
  const events = await Event.find().sort({ 'created_at': -1 }).where('date').gt(moment()).limit(6);
  res.render('main', { events });
};

exports.getSearchPage = async (req, res, next) => {
  res.render('search');
};

exports.getDashboard = async (req, res, next) => {
  // Guest
  const attendedEvents = await Event.find({ 'attendees': { '$in': [req.user.id] } }).where('date').lt(moment()).limit(3);
  const upcomingEvents = await Event.find({ 'attendees': { '$in': [req.user.id] } }).where('date').gt(moment());
  // Host
  const upcomingEventsHosted = await Event.find({ 'owner': { '$in': [req.user.id] } }).where('date').gt(moment());
  const hostedEvents = await Event.find({ 'owner': { '$in': [req.user.id] } }).where('date').lt(moment());

  res.render('dashboard', { attendedEvents, upcomingEvents, upcomingEventsHosted, hostedEvents });
};

exports.getNewEventPage = async (req, res, next) => {
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
  })
    .where('price').gte(req.query.minprice).lte(req.query.maxprice)
    .where('date').gte(req.query.fromdate).lte(req.query.todate);

  res.json(events);
};

exports.getEventWithId = async (req, res, next) => {

  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  const date = moment(event.date).format('LL');
  const time = moment(event.date).format('LT');
  let userIsAttending = false;
  let userIsOwner = false;

  const reviews = await Review.find().where('host').equals(event.owner[0]);

  // We also need to know if a logged in user is already attending
  if (res.locals.isUserLoggedIn) {
    userIsAttending = event.attendees.some((person) => {
      return person.equals(req.user._id);
    });
  }

  // We need to check if the logged in user is already the owner of the event
  if (res.locals.isUserLoggedIn) {
    userIsOwner = event.owner.some((person) => {
      return person.equals(req.user._id);
    });
  }

  res.render('event', { event, date, time, userIsAttending, userIsOwner, reviews });
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

exports.getEvent = async (req, res, next) => {

  const event = await Event.findById(req.params.id);
  const day = event.date.toISOString().substring(0, 10);
  const time = event.date.toISOString().substring(11, 19);

  res.render('editevent', { event, day, time });
};

exports.editEvent = async (req, res, next) => {

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const eventInfo = {
    'title': req.body.title,
    'capacity': req.body.capacity,
    'date': req.body.day + ' ' + req.body.time,
    'description': req.body.description,
    'address': req.body.address,
    'location': {'type': 'Point', 'coordinates': [longitude, latitude]}
  };
  console.log(eventInfo);
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, eventInfo);

  if (updatedEvent.capacity < updatedEvent.attendees.length) {
    req.flash('error', `This event already has ${updatedEvent.attendees.length} guests attending, increase number of attendees to at least that.`);
    res.redirect(`/editevent/${updatedEvent._id}`);
  } else {
    req.flash('success', `${updatedEvent.title} has been updated.`);
    res.redirect('/dashboard');
  }
};

exports.deleteEvent = async (req, res, next) => {
  const deletedEvent = await Event.findByIdAndRemove(req.params.id);
  req.flash('success', `${deletedEvent.title} has been deleted.`);
  res.redirect('/dashboard');
};

exports.makeNewEvent = async (req, res, next) => {

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const day = req.body.day;
  const time = req.body.time;

  const eventInfo = {
    'owner': req.user.id,
    'title': req.body.title,
    'foodtype': req.body.foodtype,
    'capacity': req.body.capacity,
    'price': req.body.price,
    'description': req.body.description,
    'date': day + ' ' + time,
    'address': req.body.address,
    'location': {'type': 'Point', 'coordinates': [longitude, latitude]},
    'image': {'name': req.file.filename, 'path': `/uploads/${req.file.filename}`}
  };

  const newEvent = new Event(eventInfo);
  const event = await newEvent.save();
  req.flash('success', `Event ${event.title} created!`);
  res.redirect('/dashboard');
};
