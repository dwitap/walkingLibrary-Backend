"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Transactions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Transactions.belongsTo(models.Member)
            Transactions.hasMany(models.Items)
            // define association here
        }
    }
    Transactions.init(
        {
            borrow_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expired_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            return_date: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fine: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            return_status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Transactions",
        }
    )
    return Transactions
}
