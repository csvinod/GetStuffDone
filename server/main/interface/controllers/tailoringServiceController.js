// Customer controller

const TailoringService = require('../../business/tailoring/tailoringService');
const TailoringOrder = require('../../business/tailoring/tailoringOrder');

const tailoringSvc = new TailoringService();

exports.getServiceTypes = async (req, res) => {
    console.log("Handling request for getServiceTypes: ");
    const result = await tailoringSvc.getSupportedSvcTypes();
    console.log("result: " + result);
    res.status(200).json(result);
}

exports.addGarmentService = async (req, res) => {
    console.log("Handling request for addGarmentService: ", req.body);

    const garmentID = req.body.garmentID;
    const svcType = req.body.svcType;
    const svcMeasure = req.body.svcMeasure;

    const result = await tailoringSvc.setSvcDetails(garmentID, svcType, svcMeasure);
    console.log("result: " + result);
    res.status(200).json(result);
}

exports.getGarmentServices = async (req, res) => {
    console.log("Handling request for getGarmentServices: ");

    const garmentID = req.query.garmentID;

    const result = await tailoringSvc.getSvcDetails(garmentID);
    console.log("result: " + JSON.stringify(result));
    res.status(200).json(result);
}

exports.getCustGarmentsWithServices = async (req, res) => {
    console.log("Handling request for getCustGarmentsWithServices: ", req.query);

    const userRecID = req.query.userRecID;

    const result = await tailoringSvc.getCustGarmentsWithServices(userRecID);
    console.log("result: " + result);
    res.status(200).json(result);
}

exports.confirmOrder = async (req, res) => {
    console.log("Handling request for confirmOrder: ", req.body);
    const orderID = req.body.orderID;
    const order = new TailoringOrder(orderID);
    const result = await order.confirm();
    console.log("result: " + result);
    res.status(200).json(result);
}
