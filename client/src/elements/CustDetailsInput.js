import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EmailIDField, PhoneNumberField, UserIDAttribs } from "./UserIDInput";
import { generateOtp } from '../logic/apiClients/auth/SimpleOtpApiClient';
import { updateCustDetails } from "../logic/apiClients/cust/CustOpsApiClient";

function CustDetailsInput () {

    const [fullName, setFullName] = useState();
    const [gender, setGender] = useState("Female");
    const [dateOfBirth, setDateOfBirth] = useState();
    const [address, setAddress] = useState();
    const [altUserID, setAltUserID] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    const { userID, userRecID } = location.state || {};
    console.log('Received userID:', userID);

    const _process = async () => {
        const result = await updateCustDetails(userID, altUserID, fullName, gender, dateOfBirth, address);
        const otpGen = await generateOtp(userID);
        navigate(
            "/auth",
            { state: { userID: userID, userRecID: userRecID } } 
        );
    }

    const userIDType = userID.includes('@') ? UserIDAttribs.EMAIL_ID : UserIDAttribs.PHONE_NUMBER;
    const panelContent = (userIDType === UserIDAttribs.EMAIL_ID) ? <PhoneNumberField callback={(e) => setAltUserID(e.target.value)} /> : <EmailIDField callback={(e) => setAltUserID(e.target.value)} />;

    return (
        <>
            <div>
                <Typography variant="h5" gutterBottom>
                    Logging in for the first time?
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Please fill in your details below...
                </Typography>
                <br/>
                <br/>
                {panelContent}
                <br/>
                <br/>
                <TextField
                    id="full name"
                    variant="outlined"
                    label="Full Name"
                    onChange={(e) => setFullName(e.target.value) }
                />
                <br/>
                <br/>
                <FormControl fullWidth={true}>
                    <InputLabel id="gender-label" >Gender</InputLabel>
                    <Select
                        labelId="gender-simple-select-label"
                        id="gender-simple-select"
                        label="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value) }
                    >
                        <MenuItem key={"Female"} value={"Female"}>Female</MenuItem>
                        <MenuItem key={"Male"} value={"Male"}>Male</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <br/>
                <TextField
                    id="address"
                    variant="outlined"
                    label="Address"
                    multiline={true}
                    minRows={3}
                    maxRows={10}
                    onChange={(e) => setAddress(e.target.value) }
                />
                <br/>
                <br/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="date_of_birth"
                        variant="outlined"
                        label="Date Of Birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e) }
                        format="YYYY-MM-DD"
                    />
                </LocalizationProvider>
                <br/>
            </div>
            <div>
                <br/>
                <Button 
                    id="submit"
                    variant="contained" 
                    onClick={() => _process()}>
                        Next
                </Button>
                <br/>
            </div>
        </>
    );

}

export default CustDetailsInput
