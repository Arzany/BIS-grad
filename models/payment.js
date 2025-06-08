const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Payment = sequelize.define("payment",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acc_holder_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    card_no: {
        type: DataTypes.STRING
    },
    card_no_cw: {
        type: DataTypes.STRING
    },
    bank_city: {
        type: DataTypes.STRING
    },
    bank_bic_swift: {
        type: DataTypes.STRING
    }

});



module.exports = Payment;
