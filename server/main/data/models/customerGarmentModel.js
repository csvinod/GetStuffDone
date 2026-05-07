const DataTypes = require("sequelize");
const db = require("../database");
const { OrderModel, OrderStatus } = require("./orderModel");
    
const GARMENT_TYPES = Object.freeze({
                    SHIRT: "Shirt",
                    TROUSERS_SHORTS: "Trousers/Shorts",
                    SKIRTS: "Skirts",
                    DENIM_SHIRT_JEANS_SKIRT: "Denim Shirt/Jeans/Skirt",
                    BLOUSE: "Blouse",
                    KURTA: "Kurta",
                    PYJAMA: "Pyjama",
                    GHAGRA: "Ghagra",
                    CHOLI: "Choli",
                    DUPATTA: "Dupatta",
                    BEDSHEET: "Bedsheet",
                    SARI: "Sari",
                });

const GARMENT_GENDER = Object.freeze({
                    FEMALE: "Female",
                    MALE: "Male",
                });


const CustomerGarmentModel = db.sequelize.define("CustomerGarment", {

    rec_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    garment: {
        type: DataTypes.ENUM(Object.values(GARMENT_TYPES))
    },

    garment_gender: {
        type: DataTypes.ENUM (...Object.values(GARMENT_GENDER)),
        defaultValue: GARMENT_GENDER.FEMALE,
    },

    garment_pic: {
        type: DataTypes.BLOB,
        allowNull: false,
    },

    ref_garment_included: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
    },

    ref_garment_pic: {
        type: DataTypes.BLOB,
    },

}, {
    schema: "GetStuffDone"
});

CustomerGarmentModel.OrderModel = CustomerGarmentModel.belongsTo(OrderModel, {foreignKey: "order_rec_id"});
OrderModel.CustomerGarmentModel = OrderModel.hasMany(CustomerGarmentModel, {foreignKey: "order_rec_id"});

module.exports = { CustomerGarmentModel, GARMENT_GENDER, GARMENT_TYPES };
