const Service = require('../core/service');
const TailoringServiceDAO = require('../../data/access/tailoringServiceDAO');

class TailoringService extends Service {

    static TYPES = Object.freeze({
        INCREASE_LENGTH: {service_type: "Alteration -- Increase Length", price: 150},
        DECREASE_LENGTH: {service_type: "Alteration -- Decrease Length", price: 150},
        INCREASE_SLEEVE_LENGTH: {service_type: "Alteration -- Increase Sleeve Length", price: 150},
        DECREASE_SLEEVE_LENGTH: {service_type: "Alteration -- Decrease Sleeve Length", price: 150},
        LOOSEN: {service_type: "Alteration -- Loosen", price: 200},
        TIGHTEN: {service_type: "Alteration -- Tighten", price: 200},
        FIX_BUTTON: {service_type: "Fix Button", price: 100},    
        FIX_ZIPPER: {service_type: "Fix Zipper", price: 100},
        FALL_AND_PICO: {service_type: "Fall and Pico", price: 300},
        RUFFOO: {service_type: "Ruffoo", price: 300},
    }); 

    tailoringSvcDao = new TailoringServiceDAO();


    async getSupportedSvcTypes() {
        try {
            return Object.values(TailoringService.TYPES);
        } catch (error) {
            console.log("Error executing getSupportedSvcTypes: ", error);
            return null;
        }
    }

    async setSupportedSvcTypes(serviceTypes) {
        try {
            // this is a placeholder for future extension where supported tailoring service types can be updated dynamically, 
            // especially by a service provider.
            super.setSupportedSvcTypes(serviceTypes);
        } catch (error) {
            console.log("Error executing setSupportedSvcTypes: ", error);
        }
    }

    async setSvcDetails(garmentID, svcType, svcMeasure) {
        try {
            this.tailoringSvcDao.addGarmentService(garmentID, svcType, svcMeasure);
        } catch (error) {
            console.log("Error executing setSvcDetails: ", error);
        }
    }

    async getSvcDetails(garmentID) {
        try {
            return this.tailoringSvcDao.getGarmentServices(garmentID);
        } catch (error) {
            console.log("Error executing getSvcDetails: ", error);
            return null;
        }
    }
    
}

module.exports = TailoringService;
