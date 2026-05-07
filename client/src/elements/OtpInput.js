import { useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { validateOtp } from '../logic/apiClients/auth/SimpleOtpApiClient';

function OtpInput () {

    const [key, setKey] = useState(0); // used only to force re-rendering
    const [otp, setOtp] = useState();
    const [otpValidationResult, setOtpValidationResult] = useState("Login");

    const location = useLocation();
    const navigate = useNavigate();

    const { userID, userRecID } = location.state || {};
    console.log('Received userID:', userID, ', userRecID: ', userRecID);
    if (key < 0) {
        console.log("Key: " + key);
    }

    const _process = async () => {
        let result = null;
        result = await validateOtp(userID, otp);
        console.log("_process result: " + result);
        setKey(prevKey => prevKey + 1);
        if (result) {
            setOtpValidationResult("Yay!! Valid Otp!");
            navigate(
                "/serviceBrowser",
                { state: { userID: userID, userRecID: userRecID } } 
            );
        } else {
            setOtpValidationResult("Invalid OTP -- Try again");
        }
    }   

    return (
        <>
            <div>
                <br/>
                <TextField
                    id="phone-number"
                    variant="filled"
                    disabled
                    label="Phone Number"
                    defaultValue={ userID }
                    slotProps={{
                        minLength:10,
                        maxLength:10
                    }}
                />
                <br/>
            </div>
            <div>
                <br/>
                <TextField
                    id="otp"
                    variant="outlined"
                    required
                    label= "Enter OTP"
                    slotProps={{
                        minLength:6,
                        maxLength:6
                    }}
                    onChange={(e) => { setOtp(e.target.value) } }
                />
                <br/>
            </div>
            <div>
                <br/>
                <Button 
                    id="submit"
                    variant="contained"
                    onClick={_process}
                >
                        {otpValidationResult}
                </Button>
                <br/>
            </div>
        </>
    );

}

export default OtpInput
