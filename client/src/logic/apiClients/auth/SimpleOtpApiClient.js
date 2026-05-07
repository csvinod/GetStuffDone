import axios from 'axios';

const BASE_URL = "http://localhost:8080/auth";

export const generateOtp = async (inputUserID) => {

    console.log("calling API for generate. inputUserID: " + inputUserID);

    try {
        const response = await axios.post(BASE_URL + "/generate", {
                                userID: inputUserID
                            });
        
        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) {
        console.error('Error executing request:', error);
    }
};

export const validateOtp = async (inputUserID, inputOtp) => {

    console.log("calling API for validate. inputUserID: " + inputUserID + ". inputOtp: " + inputOtp);

    try {
        const response = await axios.post(BASE_URL + "/validate", {
                                userID: inputUserID, 
                                inputOtp: inputOtp
                            });

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};
