const CustomerDAO = require('../../data/access/customerDAO');
const OrderDAO = require('../../data/access/orderDAO');

class Customer {

    static custDao = new CustomerDAO();
    static orderDAO = new OrderDAO();

    constructor(custID) {
        this.custID = custID;
    }

    async getProfile () {
        try {
            console.log("Fetching user for ID: ", this.custID);
            const user = await Customer.custDao.findOrCreate(this.custID);
            console.log(user.isNewUser? "New User Created": "Existing User Found");
            console.log("User fetched: ", JSON.stringify(user));
            return user;

        } catch (error) {
            console.log("Error fetching user: ", this.custID, error);
        }
    }

    async updateProfile(custID, altUserID, full_name, gender, date_of_birth, address) {
        try {
            const result = await Customer.custDao.update(
                                                this.custID, 
                                                altUserID, 
                                                full_name, 
                                                gender, 
                                                date_of_birth, 
                                                address);

            console.log("User Updated");

        } catch (error) {
            console.log("Error updating user: ", userID)
        }
    }

    async getCart() {
        try {
            return Customer.orderDAO.findOrCreateCart(this.custID);
        } catch (error) {
            console.log("Error fetching cart for user: ", this.custID);
        }
    }

    async getOrders() {
        return Customer.orderDAO.fetchAllOrders(this.custID);
    }

}

module.exports = Customer;
