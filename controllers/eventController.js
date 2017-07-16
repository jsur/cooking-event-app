const Event = require('../models/Event');
const User = require('../models/User');

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
  console.log(req.user.id);
  const events = await Event.find({ 'attendees': req.user.id });
  // if (events.length > 0) {
  //   events.limit(3);
  // }
  // else {
  //   e
  // }
  res.render('dashboard', { events });

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
