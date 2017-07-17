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

router.get('/search', catchErrors(eventController.getSearchPage));

router.get('/dashboard', authController.checkAuth, catchErrors(eventController.getDashboard));

router.get('/newevent', authController.checkAuth, catchErrors(eventController.getNewEventPage));
router.post('/newevent', authController.checkAuth, catchErrors(authController.makeNewEvent));

router.get('/login', authController.getLoginForm);
router.post('/login', passport.authenticate('local', {
  'successRedirect': '/',
  'successFlash': 'Successful login!',
  'failureRedirect': '/login',
  'failureFlash': true,
  'passReqToCallback': true
}));

router.get('/event/:id', catchErrors(eventController.getEventWithId));
router.post('/event/:id', authController.checkAuth, catchErrors(eventController.attendEvent));

router.post('/signup', authController.validateSignUpInfo, catchErrors(authController.makeNewUser));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

// API routes

router.get('/api/events/near', catchErrors(eventController.getEventsNearCoordinate));

module.exports = router;
