
const express = require('express');
const appRouter = express.Router();
const appLandingController = require('../controllers/appLandingController');

// Landing
appRouter.get('/', appLandingController.safeLanding);

module.exports = appRouter;
