const express = require('express');
const router = express.Router();
const passport = require('passport');
// Here we require all controllers to use their exported methods
// This way we can keep related functionalities in their own controllers
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
// ES6 Object destructuring
const {catchErrors} = require('../handlers/errorHandlers');

// Wrap function calls in route in catchErrors if async await is used in them
router.get('/', catchErrors(eventController.getMainPage));

router.get('/search', catchErrors(eventController.getSearchPage));

router.get('/dashboard', authController.checkAuth, catchErrors(eventController.getDashboard));

router.get('/newevent', authController.checkAuth, catchErrors(eventController.getNewEventPage));
router.post('/newevent', authController.checkAuth, catchErrors(eventController.makeNewEvent));

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

router.get('/profile', authController.checkAuth, catchErrors(userController.getUser));
router.post('/profile', authController.checkAuth, catchErrors(userController.updateUser));

router.get('/editevent/:id', authController.checkAuth, catchErrors(eventController.getEvent));
router.post('/editevent/:id', authController.checkAuth, catchErrors(eventController.editEvent));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

// API routes

router.get('/api/events/near', catchErrors(eventController.getEventsNearCoordinate));

module.exports = router;
