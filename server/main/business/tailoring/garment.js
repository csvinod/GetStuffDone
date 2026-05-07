const Item = require('../core/item');
const { GarmentDAO, GARMENT_TYPES, GARMENT_GENDER } = require('../../data/access/garmentDAO');

class Garment extends Item {

    garmentDAO = new GarmentDAO();

    constructor(orderID, itemId) {
        super(itemId);
        this.orderID = orderID;
    }

    async getSupportedItemTypes() {
        try {
            return Object.values(GARMENT_TYPES);
        } catch (error) {
            console.log("Error executing getGarmentTypes: ", error);
            return null;
        }
    }

    async getItemDetails() {
        try {
            const details = await this.garmentDAO.getItemDetails(this.orderID, this.itemId);
            return details;
        } catch (error) {
            console.log("Error executing getItemDetails: ", error);
            return null;
        }  
    }

    async setItemDetails(garment_type, garment_gender, garment_pic, ref_garment_included, ref_garment_pic) {

        try {
            result = await this.garmentDAO.setItemDetails(this.orderID, this.itemId, 
                garment_type, garment_gender, garment_pic, ref_garment_included, ref_garment_pic);

        } catch (error) {
            console.log("Error executing setItemDetails: ", error);
        }
    }

}

module.exports = Garment;
