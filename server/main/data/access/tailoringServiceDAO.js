const CustomerGarment = require('../models/customerGarmentModel');
const GarmentService = require('../models/garmentServiceModel');
const OrderModel = require('../models/orderModel');

class TailoringServiceDAO {

    async getGarmentServices(garmentID) {
        try {
            const result = await GarmentService.findAll({
                where: {
                    cust_garment_id: garmentID
                }
            });
            console.log('Garment Services retrieved:', JSON.stringify(result));

            return result;

        } catch (error) {
            console.error('Error retrieving garment services:', garmentID, error);
            throw error;
        }
    }

    async getCustGarmentsWithServices(userID) {
        try {
            const result = await this.findOrCreateCart(userID);

            const garments = await CustomerGarment.findAll({
                include:[{
                    model: GarmentService, 
                }],
                where: {
                    order_rec_id: result.cartID, 
                }
            });

            console.log('Garments retrieved:', garments);

            return garments;

        } catch (error) {
            console.error('Error retrieving garments:', userID, error);
            throw error;
        }
    }


    async addGarmentService(garmentID, svcType, svcMeasure) {
        try {
            const item = await GarmentService.create({
                cust_garment_id: garmentID, 
                svc_type: svcType, 
                svc_measure_inches: svcMeasure, 
            });

            console.log('New service added to garment:', item.toJSON());

            return null;

        } catch (error) {
            console.error('Error adding service to garment:', garmentID, error);
            throw error;
        }
    }

}

module.exports = TailoringServiceDAO;
