
const express = require('express');
const custRouter = express.Router();
const appLandingController = require('../controllers/appLandingController');
const customerController = require('../controllers/customerController');
const garmentController = require('../controllers/garmentController');
const tailoringServiceController = require('../controllers/tailoringServiceController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Test Mount-point
custRouter.get('/', appLandingController.safeLanding);

// Customer
custRouter.get  ('/user', customerController.fetchUser);
custRouter.put  ('/user', customerController.updateUser);
custRouter.get  ('/cart', customerController.getCart);
custRouter.get  ('/order', customerController.getOrders);
custRouter.post ('/order', tailoringServiceController.confirmOrder);

custRouter.get  ('/tailoring/garmentTypes', garmentController.getGarmentTypes);
custRouter.get  ('/tailoring/custGarments', garmentController.getCustGarments);

custRouter.get  ('/tailoring/serviceTypes', tailoringServiceController.getServiceTypes);
custRouter.get  ('/tailoring/garmentServices', tailoringServiceController.getGarmentServices);
custRouter.post ('/tailoring/garmentServices', tailoringServiceController.addGarmentService);

custRouter.get  ('/tailoring/custGarmentsWithServices', tailoringServiceController.getCustGarmentsWithServices);

// custRouter.get('/order', customerController.fetchOrder);


const uploadMiddleware = upload.fields([
        { name: 'garmentPic', maxCount: 1 },
        { name: 'refGarmentPic', maxCount: 1 }
    ]);
custRouter.post ('/tailoring/custGarment', uploadMiddleware, garmentController.addCustGarment);


module.exports = custRouter;
