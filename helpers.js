require('dotenv').config({'path': '.env'});

// Get static map from google api
exports.staticMap = ([lng, lat]) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=960x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`
};
