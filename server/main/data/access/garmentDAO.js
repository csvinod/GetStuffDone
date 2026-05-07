const { CustomerGarmentModel, GARMENT_GENDER, GARMENT_TYPES } = require('../models/customerGarmentModel');

class GarmentDAO {

    async getCustGarments(orderID) {
        try {
            const garments = await CustomerGarmentModel.findAll({
                where: {
                    order_rec_id: orderID, 
                }
            });

            console.log('Garments retrieved:', JSON.stringify(garments));
            return garments;

        } catch (error) {
            console.error('Error retrieving garments:', orderID, error);
            throw error;
        }
    }

    async addCustGarment(orderID, garmentType, garment_gender, garment_pic, ref_garment_included, ref_garment_pic) {
        try {
            const item = await CustomerGarmentModel.create({
                order_rec_id: orderID, 
                garment: garmentType, 
                garment_gender: garment_gender, 
                garment_pic: garment_pic, 
                ref_garment_included: ref_garment_included, 
                ref_garment_pic: ref_garment_pic
            });

            console.log('New garment added:', item.toJSON());

            const response = {
                garmentRecID: item.rec_id,
            };

            return response;

        } catch (error) {
            console.error('Error creating garment:', orderID, error);
            throw error;
        }
    }

    async updateCustGarment(orderID, item_id, garmentType, garment_gender, garment_pic, ref_garment_included, ref_garment_pic) {
        try {
            console.log("Updating item in cart: ", orderID, item_id, garmentType, garment_gender, garment_pic, ref_garment_included, ref_garment_pic);

            await CustomerGarmentModel.update({
                garment: garmentType, 
                garment_gender: garment_gender, 
                garment_pic: garment_pic, 
                ref_garment_included: ref_garment_included, 
                ref_garment_pic: ref_garment_pic
            },{
                where: {
                    order_rec_id: orderID,
                    id: item_id,
                }
            });

            console.log("Garment Update done");
            return null;

        } catch (error) {
            console.error('Error updating garment:', orderID, item_id, error);
            throw error;
        }
    }

    async removeCustGarment(orderID, item_id) {
        try {
            console.log("Removing item from cart: ", orderID, item_id);
            await CustomerGarmentModel.destroy({
                where: {
                    order_rec_id: orderID,
                    id: item_id,
                }
            });

            console.log("Remove done");
            return null;

        } catch (error) {
            console.error('Error removing item from cart:', orderID, item_id, error);
            throw error;
        }
    }

}

module.exports = { GarmentDAO, GARMENT_GENDER, GARMENT_TYPES };