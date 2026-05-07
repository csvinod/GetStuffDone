const Order = require('../../business/core/order');
const { OrderModel, OrderStatus } = require('../models/orderModel');


class OrderDAO {

    async findOrCreateCart(userRecID) {
        // Model Simplification: 
        // Cart == Unconfirmed Order
        // So we just create a order every time we add the first garment to an empty cart

        try {
            const [cart, created] = await OrderModel.findOrCreate({
                where: {
                    cust_id: userRecID,
                    order_status: OrderStatus.IN_CART,
                }
            });

            if (created) {
                console.log('New empty cart created:', cart.toJSON());
            } else {
                console.log('Existing cart found:', cart.toJSON());
            }


            const response = {
                cartID: cart.rec_id,
            };

            return response;

        } catch (error) {
            console.error('Error creating cart:', userRecID, error);
            throw error;
        }
    }

    async updateOrderStatus(orderID, status) {
        try {
            console.log("Updating order status: ", orderID, status);
            const result = await OrderModel.update({
                order_status: status,
            }, {
                where: {
                    rec_id: orderID,
                }
            });

            console.log("Order update done");
            return result;

        } catch (error) {
            console.error('Error updating order status:', error, orderID, status);
            throw error;
        }
    }

    async findAll(topn = 10) {
        try {
            const orders = await OrderModel.findAll({
                where: {
                    order_status: { [Op.ne]: OrderStatus.IN_CART }
                },
                order: [['createdAt', 'DESC']],
                limit: topn,
            });

            return orders;

        } catch (error) {
            console.error('Error finding all orders:', error);
            throw error;
        }    }

}

module.exports = OrderDAO;
