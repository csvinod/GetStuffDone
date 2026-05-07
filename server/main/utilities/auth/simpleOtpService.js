const EmailService = require("../comms/email/emailService");

class SimpleOtpService {

    constructor() {
        this.userOtps = new Map() // Initialize an empty Map of users and their active Otp
        this.emailService = new EmailService();
    }

    _addUserOtp(userID, otp) {
        this.userOtps.set(userID, otp);
    };

    _deleteUserOtp = (userID) => {
        this.userOtps.delete(userID);
    };

    async generateOtp (userID) {
        try {
            var otp = "";
            for (let i=0; i<6; i++) {
                const digit = Math.floor(Math.random() * 10);
                otp += digit.toString();
            }
            this._addUserOtp(userID, otp);
            this.emailService.sendOtp(userID, otp);
            return otp;
        } catch (error) {
            console.log("Error generating OTP: ", userID, error);
        }
    };

    async validateOtp (userID, inputOtp, deleteEntry) {
        console.log("validateOtp inputs: ", userID, inputOtp, deleteEntry)
        try {
            const storedOtp = this.userOtps.get(userID);
            console.log("this.userOtps: ", this.userOtps);
            console.log("storedOtp: ", storedOtp);
            const result = (storedOtp!== undefined && inputOtp === storedOtp);
            if(deleteEntry) {
                this._deleteUserOtp(userID);
            }
            return result;
        } catch (error) {
            console.log("Error validating OTP: ", userID, error);
        }
    }

}

module.exports = SimpleOtpService;
