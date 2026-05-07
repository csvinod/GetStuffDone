const { OrderStatus } = require('../../data/models/orderModel');

OrderDAO = require('../../data/access/OrderDAO');

class Order {


    orderDAO = new OrderDAO();

    items = [];


    constructor(orderID) {
        this.orderID = orderID;
    }

    async getAllItems() {
        throw new Error("Method must be implemented.");
    }

    async addItem(item) {
        throw new Error("Method must be implemented.");
    }

    async removeItem(item) {
        throw new Error("Method must be implemented.");
    }

    async getPricingBreakup() {
        return {
            baseAmount: this.__getBaseAmount(),
            discounts: this.__getDiscounts(),
            taxes: this.__getTaxes(),
            totalAmount: this.__getTotalAmount(),
        }
    }

    async processPayment() {
        // process payment using the customer's payment information
        // if payment is successful, update the order status to "Paid"
    }

    async getStatus() {
        return this.orderDAO.getOrderStatus(this.orderID);
    }

    async confirm() {
        this.updateStatus(OrderStatus.CONFIRMED);
    }

    async updateStatus(status) {
        // validate the status transition, e.g., only allow certain transitions based on the current status
        // if valid, update the order status and save it to the database
        this.orderDAO.updateOrderStatus(this.orderID, status);
    }

    __getBaseAmount() {
        return this.items.reduce((total, item) => total + (item.getTotalPrice()), 0);
    }

    __getDiscounts() {
        // calculate discounts based on the order details, e.g., total amount, customer profile, etc.
        return 0; // Placeholder - replace with actual discount calculation
    }

    __getTaxes() {
        // calculate taxes based on the order details, e.g., total amount, location, etc.
        return 0; // Placeholder - replace with actual tax calculation  
    }

    __getTotalAmount() {
        const baseAmount = this.getBaseAmount();
        const discounts = this.getDiscounts();
        const taxes = this.getTaxes();
        return baseAmount - discounts + taxes;
    }

}

module.exports = Order;