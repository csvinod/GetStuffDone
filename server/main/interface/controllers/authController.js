// Otp controller

exports.generateOtp = async (req, res) => {
    console.log("Handling request for generateOtp: ", req.body);
    const userID = req.body.userID;
    const otp = await authService.generateOtp(userID);
    console.log("Otp generated: " + otp);
    res.status(200).json("true");
}

exports.validateOtp = async (req, res) => {
    console.log("Handling request for validateOtp: ", req.body);
    const userID = req.body.userID;
    const inputOtp = req.body.inputOtp;
    const result = await authService.validateOtp(userID, inputOtp);
    res.status(200).json(result);
}
