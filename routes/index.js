const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
// Here we require all controllers to use their exported methods
// This way we can keep related functionalities in their own controllers
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewController');
// ES6 Object destructuring
const {catchErrors} = require('../handlers/errorHandlers');

// Wrap function calls in route in catchErrors if async await is used in them
router.get('/', catchErrors(eventController.getMainPage));

router.get('/search', catchErrors(eventController.getSearchPage));

router.get('/dashboard', authController.checkAuth, catchErrors(eventController.getDashboard));
router.post('/dashboard', authController.checkAuth, upload.single('image'), catchErrors(userController.updateUser));

router.get('/newevent', authController.checkAuth, catchErrors(eventController.getNewEventPage));
router.post('/newevent', upload.single('image'), authController.checkAuth, catchErrors(eventController.makeNewEvent));

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

router.post('/profile', authController.checkAuth, upload.single('image'), catchErrors(userController.updateUser));

router.get('/editevent/:id', authController.checkAuth, catchErrors(eventController.getEditableEvent));
router.post('/editevent/:id', upload.single('image'), authController.checkAuth, catchErrors(eventController.editEvent));
router.post('/editevent/:id/delete', authController.checkAuth, catchErrors(eventController.deleteEvent));

router.post('/review/:id', authController.checkAuth, catchErrors(reviewController.leaveReview));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

// API routes

router.get('/api/events/near', catchErrors(eventController.getEventsNearCoordinate));

module.exports = router;
