
class Service{

    // Service provided on an item

    constructor(item, serviceType){
        this.item = item;
        this.type = serviceType;
    }

    // Domain specific implementation of service types, e.g., for a laptop, it could be screen repair, memory upgrade, etc.

    getSupportedSvcTypes() {
        throw new Error("Method 'getSupportedServiceTypes()' must be implemented.");
    }

    setSupportedSvcTypes(serviceTypes) {
        throw new Error("Method 'setSupportedServiceTypes(serviceTypes)' must be implemented.");
    }

    getItem() {
        return this.item;
    }
    
    // Domain specific implementation of service details, e.g., for a screen repair, it could be the issue description, estimated cost, etc.

    getSvcDetails() {
        throw new Error("Method 'getServiceDetails()' must be implemented.");
    }

    setSvcDetails(...details) {
        throw new Error("Method 'setServiceDetails(details)' must be implemented.");
    }

}

module.exports = Service;
