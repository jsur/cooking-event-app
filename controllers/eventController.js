const Event = require('../models/Event');

// With exports.something we don't need to use module.exports in the
// end of the file
exports.getMainPage = async (req, res, next) => {
  // Await that Event.find is ready, then render
  const events = await Event.find().limit(6);
  res.render('main', { events });
};

exports.getSearchPage = async (req, res, next) => {
  // Await that Event.find is ready, then render
  const events = await Event.find().limit(6);
  res.render('search', { events });
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
        // 5km
        '$maxDistance': 5000
      }
    }
  }).select('name title description');

  res.json(events);
};
