const Event = require('../models/Event');
const User = require('../models/User');
const moment = require('moment');
const http = require('https');

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

  const mindate = moment(parseInt(req.query.fromdate, 10));
  const maxdate = moment(parseInt(req.query.todate, 10));

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
    .where('date').gte(mindate).lte(maxdate);

  res.json(events);

};

exports.getEventWithId = async (req, res, next) => {

  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  const date = moment(event.date).format('LL');
  const time = moment(event.date).format('LT');

  res.render('event', { event, date, time });
};

// function getGeocode (location) {
//
//
//   const options = {
//     'method': 'GET',
//     'hostname': 'maps.googleapis.com',
//     'port': null,
//     'path': '/maps/api/geocode/json?address=' + location.split(' ').join('+') + '&key=AIzaSyBD5ntBqVPjV3yyQueoAvdPbNYJAEnSPq4'
//   };
//
//
//   var geoCode = http.request(options, function (res) {
//     const chunks = [];
//
//     res.on('data', function (chunk) {
//       chunks.push(chunk);
//     });
//
//     res.on('end', function () {
//       const body = Buffer.concat(chunks);
//       const responseObject = JSON.parse(body.toString());
//     });
//   });
//   geoCode.end();
//   console.log(geoCode)
// };

exports.makeNewEvent = async (req, res, next) => {


  const eventInfo = {
    'owner': req.user.id,
    'title': req.body.title,
    'foodtype': req.body.foodtype,
    'price': req.body.price,
    'description': req.body.description,
    'date': req.body.date,
    'location': {'type': 'Point', 'coordinates': [req.body.longitude, req.body.latitude]}
  };

// getGeocode(req.body.location)

  const newEvent = new Event(eventInfo);
  const event = await newEvent.save();
  req.flash('success', `Event ${event.title} created!`);
  console.log(eventInfo);
  res.redirect('/dashboard');
};
