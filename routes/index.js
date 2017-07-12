const express = require('express');
const router = express.Router();
//Here we require all controllers to use their exported methods
//This way we can keep related functionalities in their own controllers
const exampleController = require('../controllers/exampleController');
const authController = require('../controllers/authController');

router.get('/', exampleController.getExamplePage);
router.get('/signup', exampleController.getSignUpForm);

router.post('/signup', authController.makeNewUser);

module.exports = router;
