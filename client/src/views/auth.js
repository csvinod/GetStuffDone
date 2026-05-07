import { useState } from "react";
import Banner from "../elements/AppBanner";
import { UserIDInput } from "../elements/UserIDInput";
import OtpInput from "../elements/OtpInput";
import '../styles/App.css';


function Auth() {

    const [otpGenerated, setOtpGenerated] = useState(false);

    return (
        <>
            <Banner/>
            <div className="App-page">
                {!otpGenerated ? (
                    <UserIDInput callback={setOtpGenerated}/>
                    ) : (
                    <OtpInput/>
                    )
                }
            </div>
        </>
    );

}

export default Auth
