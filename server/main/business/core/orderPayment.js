
class OrderPayment {
    
    constructor(order, amount, method, status) {
        this.order = order;
        this.amount = amount;
        this.method = method;
        this.status = status;
    }

    getPaymentDetails() {
        throw new Error("Method 'getPaymentDetails()' must be implemented.");
    }

    setPaymentDetails(details) {
        throw new Error("Method 'setPaymentDetails(details)' must be implemented.");
    }

}

module.exports = OrderPayment;