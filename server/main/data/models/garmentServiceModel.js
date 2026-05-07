const DataTypes = require("sequelize");
const db = require('../database');
const { CustomerGarmentModel } = require("./customerGarmentModel");


const GarmentServiceModel = db.sequelize.define("GarmentService", {

    rec_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    cust_garment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    svc_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    svc_measure_inches: {
        type: DataTypes.NUMBER (5,2),
    },

}, {
    schema: "GetStuffDone"
});

GarmentServiceModel.CustomerGarmentModel = GarmentServiceModel.belongsTo(CustomerGarmentModel, {foreignKey: "cust_garment_id"});
CustomerGarmentModel.GarmentServiceModel = CustomerGarmentModel.hasMany(GarmentServiceModel, {foreignKey: "cust_garment_id"});


module.exports = GarmentServiceModel;
