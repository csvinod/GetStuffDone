const Customer = require('../../business/core/customer');


exports.fetchUser = async (req, res) => {
    console.log("Handling request for fetchUser: ", req.query);

    const userID = req.query.userID;
    const cust = new Customer(userID);

    const result = await cust.getProfile();
    console.log("result: " + JSON.stringify(result));
    res.status(200).json(result);
}

exports.updateUser = async (req, res) => {
    console.log("Handling request for update: ", req.body);

    const userID = req.body.userID;
    const altUserID = req.body.altUserID;
    const full_name = req.body.fullName;
    const gender = req.body.gender;
    const date_of_birth = req.body.dateOfBirth;
    const address = req.body.address;

    const cust = new Customer(userID);
    const result = await cust.updateProfile(altUserID, full_name, gender, date_of_birth, address);
    console.log("result: " + result);
    res.status(200).json(result);
}

exports.getCart = async (req, res) => {
    console.log("Handling request for getCart: ", req.query);
    const userID = req.query.userID;
    const cust = new Customer(userID);

    const result = await cust.getCart();
    console.log("result: " + result);
    res.status(200).json(result);
}

exports.getOrders = async (req, res) => {
    console.log("Handling request for getOrders: ", req.body);
    const userID = req.query.userID;
    const cust = new Customer(userID);

    const result = await cust.getOrders();
    console.log("result: " + result);
    res.status(200).json(result);
}

