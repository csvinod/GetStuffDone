const nodemailer = require("nodemailer");

class EmailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GOOGLE_EMAILID,
                pass: process.env.GOOGLE_APP_PASSWORD,
            },
            newline: "windows"
        });

        this.footer = "\n\nGetStuffDone!\nPlease do not reply to this email, as this is an automated email from an unmonitored mailbox."
    }

    async _send(sender, recipient, subject, content) {
        const info = await this.transporter.sendMail(
            {
                from: sender,
                to: recipient,
                subject: subject,
                text: content + this.footer,
            },
            (err, info) => {
                if (err) { 
                    console.log("Error sending message:", err);
                } else {
                    console.log("Message sent:", info.envelope, info.messageId);
                    // Pipe the raw RFC 822 message to STDOUT
                    info.message.pipe(process.stdout);
                }
            }
        );
    }

    sendOtp(recipient, otp) {
        try {
            this._send("auth@GetStuffDone.in", recipient, "Your OTP for login", otp);
            console.log("OTP sent successfully to: ", recipient);
        } catch (error) {
            console.log("Error sending OTP to: ", recipient);
        }
    }    

}

module.exports = EmailService;
