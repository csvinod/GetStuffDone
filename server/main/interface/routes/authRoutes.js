
const express = require('express');
const authRouter = express.Router();
const appLandingController = require('../controllers/appLandingController');
const authController = require('../controllers/authController');


//Test Mount-point
authRouter.get('/', appLandingController.safeLanding);

// Auth via OTP
authRouter.post('/generate', authController.generateOtp);
authRouter.post('/validate', authController.validateOtp);

module.exports = authRouter;
