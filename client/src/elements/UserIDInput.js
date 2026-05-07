import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from '@mui/material';
import { generateOtp } from '../logic/apiClients/auth/SimpleOtpApiClient';
import { fetchUser } from "../logic/apiClients/cust/CustOpsApiClient";

const UserIDAttribs = Object.freeze({
    EMAIL_ID: "Email ID", 
    PHONE_NUMBER: "Phone Number"
});

function PhoneNumberField (props) {

    return (
        <TextField
            id="phoneNumber"
            variant="outlined"
            required
            label="Phone Number"
            defaultValue=""
            slotProps={{
                minLength:10,
                maxLength:10
            }}
            onChange={props.callback}
        />
    );
}

function EmailIDField (props) {

    return (
        <TextField
            id="emailID"
            variant="outlined"
            required
            label="Email ID"
            defaultValue=""
            onChange={props.callback}
        />
    );
}

function UserIDInput (props) {

    const navigate = useNavigate();

    const [userID, setUserID] = useState();

    // selection
    const userIDType = UserIDAttribs.EMAIL_ID;

    const _process = async () => {
        const data = await fetchUser(userID);
        console.log("_process data: " + JSON.stringify(data));

        if (data.isNewUser) {
            navigate(
                "/custDetails",
                { state: { userID: userID, userRecID: data.userRecID} } 
            );
        } else {
            generateOtp(userID);
            props.callback(true);
            navigate(
                "/auth",
                { state: { userID: userID, userRecID: data.userRecID } } 
            );
        }
    }

    const panelContent = (userIDType === UserIDAttribs.EMAIL_ID) ? <EmailIDField callback={(e) => setUserID(e.target.value)} /> : <PhoneNumberField callback={(e) => setUserID(e.target.value)} />;

    return (
        <>
            <div>
                <br/>
                {panelContent}
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

export { UserIDAttribs, PhoneNumberField, EmailIDField, UserIDInput };
