// Customer controller

const Garment = require('../../business/tailoring/garment');
const TailoringOrder = require('../../business/tailoring/tailoringOrder');

const garment = new Garment();


exports.getGarmentTypes = async (req, res) => {
    console.log("Handling request for getGarmentTypes: ");
    const result = await garment.getSupportedItemTypes();
    console.log("result: " + result);
    res.status(200).json(result);
}

exports.addCustGarment = async (req, res) => {

    console.log("Handling request for addCustGarment: ", JSON.stringify(req.body));

    const cartID = req.body.cartID;
    const garment = req.body.garment;
    const garment_gender = req.body.garmentGender;
    const ref_garment_included = req.body.refGarmentIncluded;

    console.log("Received form data: ", req.headers, req.body);

    garmentPic = req.files.garmentPic;
    refGarmentPic = ref_garment_included ? req.files.refGarmentPic : null;

    garment_pic = (garmentPic === null || garmentPic === undefined) ? null : garmentPic[0].buffer;
    ref_garment_pic = (refGarmentPic === null || refGarmentPic === undefined) ? null : refGarmentPic[0].buffer;

    const tailoringOrder = new TailoringOrder(cartID);
    const item =    { 
                        garment: garment, 
                        garment_gender: garment_gender, 
                        garment_pic: garment_pic, 
                        ref_garment_included: ref_garment_included, 
                        ref_garment_pic: ref_garment_pic 
                    };
    const result = await tailoringOrder.addItem(item);
    console.log("result: " + result);
    res.status(200).json(result);
}

exports.getCustGarments = async (req, res) => {
    console.log("Handling request for getCustGarments: ");

    const orderID = req.query.orderID;
    const tailoringOrder = new TailoringOrder(orderID);
    const result = await tailoringOrder.getAllItems();
    console.log("result: " + result);
    res.status(200).json(result);
}
