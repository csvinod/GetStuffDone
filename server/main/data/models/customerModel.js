const DataTypes = require("sequelize");
const db = require('../database');

const CustomerModel = db.sequelize.define("Customer", {

    rec_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    full_name: {
        type: DataTypes.STRING,
    },

    emailid: {
        type: DataTypes.STRING,
    },

    mobile_num: {
        type: DataTypes.INTEGER,
    },

    gender: {
        type: DataTypes.ENUM("Male", "Female"),
    },

    birth_date: {
        type: DataTypes.DATEONLY,
    },

    address: {
        type: DataTypes.INTEGER,
    },

}, {
    indexes: [
        { unique: true, fields: ["mobile_num"] }
    ],
    schema: "GetStuffDone"
});

module.exports = CustomerModel;
