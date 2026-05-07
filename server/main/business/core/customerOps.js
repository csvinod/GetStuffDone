const TailoringCartDAO = require('../../main/data/access/tailoringCartDAO');

class CustomerOps {

    async getCustGarments(userRecID) {
        try {
            const garments = await this.tailoringCartDAO.getCustGarments(userRecID);
            return garments;
        } catch (error) {
            console.log("Error getting customer garments: ", userRecID);
            return null;
        }
    }

    async addCustGarment(userID, garment, garment_gender, garment_pic, ref_garment_included, ref_garment_pic) {
        try {
            const result = await this.tailoringCartDAO.addCustGarment(userID, garment, garment_gender, garment_pic, ref_garment_included, ref_garment_pic);
            console.log("Added garment");
            return result;
        } catch (error) {
            console.log("Error adding garment: ", error);
            return null;
        }
    }

    async getGarmentServices(garmentID) {
        try {
            const garmentServices = await this.tailoringCartDAO.getGarmentServices(garmentID);
            return garmentServices;
        } catch (error) {
            console.log("Error getting garment services: ", garmentID);
            return null;
        }
    }

    async getCustGarmentsWithServices(userRecID) {
        try {
            const garments = await this.tailoringCartDAO.getCustGarmentsWithServices(userRecID);
            return garments;
        } catch (error) {
            console.log("Error getting customer garments: ", userRecID);
            return null;
        }
    }

    async addGarmentService(garmentID, svcType, svcMeasure) {
        try {
            const result = await this.tailoringCartDAO.addGarmentService(garmentID, svcType, svcMeasure);
            console.log("Added service to garment");
            return result;
        } catch (error) {
            console.log("Error adding service to garment: ", error);
            return null;
        }
    }

    async confirmOrder(userRecID) {
        try {
            const result = await this.tailoringCartDAO.confirmOrder(userRecID);
            console.log("Order Confirmation done");
            return result;
        } catch (error) {
            console.log("Error confirming order: ", userRecID, error);
            return null;
        }
    }
}

module.exports = CustomerOps;
