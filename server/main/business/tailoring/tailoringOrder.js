const Order = require('../core/order');
const { GarmentDAO } = require('../../data/access/garmentDAO');

class TailoringOrder extends Order {

    async getAllItems() {
        try {
            const garments = await new GarmentDAO().getCustGarments(this.orderID);
            return garments;
        } catch (error) {
            console.log("Error executing getAllItems: ", error);
            return null;
        }
    }

    async addItem(item = {}) {

        console.log("Adding item to tailoring order: ", item.garment, item.garment_gender);
        try {
            const garments = await new GarmentDAO().addCustGarment(this.orderID, 
                                                                    item.garment, 
                                                                    item.garment_gender, 
                                                                    item.garment_pic, 
                                                                    item.ref_garment_included, 
                                                                    item.ref_garment_pic);

            return garments;
        } catch (error) {
            console.log("Error executing addItem: ", error);
            return null;
        }
    }

    async removeItem(item) {
        try {
            const garments = await new GarmentDAO().removeCustGarment(this.orderID, item.itemId);
            return garments;
        } catch (error) {
            console.log("Error executing removeItem: ", error);
            return null;
        }
    }


}

module.exports = TailoringOrder;
