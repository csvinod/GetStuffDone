const DataTypes = require("sequelize");
const db = require('../database');
const CustomerModel = require("./customerModel");


const OrderStatus = Object.freeze({
                        IN_CART: "Unconfirmed",
                        CONFIRMED: "Confirmed",
                        PICKUP_SCHEDULED: "Pickup Scheduled",
                        PICKED_UP: "Picked Up",
                        PROCESSING: "Processing",
                        READY_TO_DELIVER: "Ready To Deliver",
                        DELIVERY_SCHEDULED: "Delivery Scheduled",
                        DELIVERED: "Delivered",
                        UNSATISFACTORY: "Unsatisfatory",
                        PROCESSED: "Closed",
                    });

const OrderModel = db.sequelize.define("Order", {

    rec_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    order_status: {
        type: DataTypes.ENUM(...Object.values(OrderStatus)),
        defaultValue: OrderStatus.IN_CART,
    }

}, {
    schema: "GetStuffDone"
});

OrderModel.CustomerModel = OrderModel.belongsTo(CustomerModel, {foreignKey: "cust_id"});
CustomerModel.OrderModel = CustomerModel.hasMany(OrderModel, {foreignKey: "cust_id"});

module.exports = { OrderModel, OrderStatus };
