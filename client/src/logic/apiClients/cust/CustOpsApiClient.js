import axios from 'axios';

const BASE_URL = "http://localhost:8080/cust";

export const fetchUser = async (inputUserID) => {

    console.log("calling API for fetchUser. inputUserID: " + inputUserID);

    try {
        const response = await axios.get(BASE_URL + "/user", {
                                params: {
                                    userID: inputUserID, 
                                }
                            });

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", JSON.stringify(data));
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};

export const updateCustDetails = async (inputUserID, altUserID, fullName, gender, dateOfBirth, address) => {

    console.log("calling API for update. inputUserID: ", inputUserID, altUserID, fullName, gender, dateOfBirth, address);

    try {
        const response = await axios.put(BASE_URL + "/user", {
                                userID: inputUserID,
                                altUserID: altUserID,
                                fullName: fullName,
                                gender: gender,
                                dateOfBirth: dateOfBirth,
                                address: address
                            });

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};


export const fetchCart = async (inputUserID) => {

    console.log("calling API for fetchCart. inputUserID: " + inputUserID);

    try {
        const response = await axios.get(BASE_URL + "/cart", {
                                params: {
                                    userID: inputUserID, 
                                }
                            });

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};


export const getGarmentTypes = async () => {

    console.log("calling API for getGarmentTypes");

    try {
        const response = await axios.get(BASE_URL + "/tailoring/garmentTypes");

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};

export const getServiceTypes = async () => {

    console.log("calling API for getServiceTypes");

    try {
        const response = await axios.get(BASE_URL + "/tailoring/serviceTypes");

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};


export const getCustGarments = async (orderID) => {

    console.log("calling API for getCustGarments. orderID: ", orderID);

    try {

        const response = await axios.get(BASE_URL + "/tailoring/custGarments", {
            params: {
                orderID: orderID
            }
        });

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};


export const addCustGarment = async (cartID, garment, garmentGender, garmentPic, refGarmentIncluded, refGarmentPic) => {

    console.log("calling API for addItemToCart. input: ", cartID, garment, garmentGender, garmentPic, refGarmentIncluded, refGarmentPic);

    try {

        const formData = new FormData();
        formData.append('cartID', cartID);
        formData.append('garment', garment);
        formData.append('garmentGender', garmentGender);
        formData.append('garmentPic', garmentPic);
        formData.append('refGarmentIncluded', refGarmentIncluded); 
        formData.append('refGarmentPic', refGarmentPic);

        const response = await axios.post(BASE_URL + "/tailoring/custGarment", formData);

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};

export const addGarmentService = async (garmentID, svcType, svcMeasure) => {

    console.log("calling API for addGarmentService. inputs: ", garmentID, svcType, svcMeasure);

    try {

        const response = await axios.post(BASE_URL + "/tailoring/garmentService", {
                                garmentID: garmentID,
                                svcType: svcType,
                                svcMeasure: svcMeasure
                            });

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};

export const getGarmentServices = async (garmentID) => {
    console.log("calling API for getGarmentServices. inputs: ", garmentID);
    try {
        const response = await axios.get(BASE_URL + "/tailoring/garmentServices", {
                                params: {
                                    garmentID: garmentID,   
                                }
                            });
        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;
    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};

export const getCustGarmentsWithServices = async (userRecID) => {

    console.log("calling API for getCustGarmentsWithServices. inputs: ", userRecID);

    try {

        const response = await axios.get(BASE_URL + "/tailoring/custGarmentsWithServices", {
                                params: {
                                    userRecID: userRecID,
                                }
                            });

        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;

    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};

export const confirmOrder = async (orderID) => {
    console.log("calling API for confirmOrder. inputs: ", orderID);

    try {
        const response = await axios.post(BASE_URL + "/order", {
                                orderID: orderID,
                            });
        const data = response.data;
        console.log("Status: ", response.status, "Data: ", data);
        return data;
    } catch(error) { 
        console.error('Error executing request:', error) 
    }
};
