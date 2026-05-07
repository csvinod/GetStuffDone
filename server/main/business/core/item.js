
class Item {

    services = [];

    constructor(itemId) {
        this.itemId = itemId;
    }

    // Domain specific implementation of item types, e.g., for an electronic item, it could be phone, laptop, etc.

    async getSupportedItemTypes() {
        throw new Error("Method 'getSupportedItemTypes()' must be implemented.");
    }

    async setSupportedItemTypes(itemTypes) {
        throw new Error("Method 'setSupportedItemTypes()' must be implemented.");
    }


    // Domain specific implementation of item details, e.g., for a phone, it could be brand, model, etc.

    async getItemDetails() {
        throw new Error("Method 'getItemDetails()' must be implemented.");
    }

    async setItemDetails(...details) {
        throw new Error("Method 'setItemDetails(details)' must be implemented.");
    }
    
    async addService(service) {
        this.services.push(service);
    }

    async getTotalPrice() {
        return this.services.reduce((total, svc) => total + svc.getPrice(), 0);
    }

    async removeService(service) {
        this.services = this.services.filter(svc => svc !== service);
    }

    async getAllServices() {
        return this.services;
    }

}

module.exports = Item;
