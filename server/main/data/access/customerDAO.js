
const CustomerModel = require("../models/customerModel");

class CustomerDAO {

    async findAll(topn = 10) {
        try {
            const customers = await CustomerModel.findAll({
                order: [['createdAt', 'DESC']],
                limit: topn
            });

            return customers;

        } catch (error) {
            console.error('Error finding all customers:', error);
            throw error;
        }
    }

    async findOrCreate(userID) {
        try {
            const [customer, created] = await CustomerModel.findOrCreate({
                where: {
                    emailid: userID,
                }
            });

            if (created) {
                console.log('New user created:', customer.toJSON());
            } else {
                console.log('Existing user found:', customer.toJSON());
            }

            const response = {
                isNewUser: created,
                userID: customer.emailid,
                userRecID: customer.rec_id,
                altUserID: customer.mobile_num,
                fullName: customer.full_name,
                gender: customer.gender,
                dateOfBirth: customer.birth_date,
                address: customer.address
            };

            return response;

        } catch (error) {
            console.error('Error creating user:', userID, error);
            throw error;
        }
    }

    async update(userID, altUserID, full_name, gender, date_of_birth, address) {
        try {
            console.log("Updating customer: ", userID, altUserID, full_name, gender, date_of_birth, address);
            if (userID.includes('@')) {
                await CustomerModel.update({
                    mobile_num: altUserID,
                    full_name: full_name,
                    gender: gender,
                    birth_date: new Date(date_of_birth),
                    address: address 
                },{
                    where: {
                        emailid: userID,
                    }
                });
            } else {
                await CustomerModel.update({
                    emailid: altUserID,
                    full_name: full_name,
                    gender: gender,
                    birth_date: new Date(date_of_birth),
                    address: address 
                },{
                    where: {
                        mobile_num: userID,
                    }
                });
            }

            console.log("Update done");
            return null;

        } catch (error) {
            console.error('Error updating user:', userID, error);
            throw error;
        }
    }
}

module.exports = CustomerDAO;
