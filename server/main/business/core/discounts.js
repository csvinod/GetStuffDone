
class Discounts {

    discounts = [];

    addDiscount(discount) {
        this.discounts.push(discount);
    }

    cleanupExpiredDiscounts() {
        const now = new Date();
        this.discounts = this.discounts.filter(discount => discount.expiryDate > now);
    }

}

module.exports = Discounts;
