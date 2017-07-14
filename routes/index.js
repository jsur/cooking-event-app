const express = require('express');
const router = express.Router();
const passport = require('passport');
// Here we require all controllers to use their exported methods
// This way we can keep related functionalities in their own controllers
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
// ES6 Object destructuring
const {catchErrors} = require('../handlers/errorHandlers');

// Wrap function calls in route in catchErrors if async await is used in them
router.get('/', catchErrors(eventController.getMainPage));

router.get('/login', authController.getLoginForm);

router.post('/signup', catchErrors(authController.makeNewUser));

router.post('/login', passport.authenticate('local', {
  'successRedirect': '/',
  'successFlash': 'Successful login!',
  'failureRedirect': '/login',
  'failureFlash': true,
  'passReqToCallback': true
}));

module.exports = router;
