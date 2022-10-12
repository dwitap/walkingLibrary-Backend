"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Transaction.belongsTo(models.Member)
            Transaction.hasOne(models.Items)
            // define association here
        }
    }
    Transaction.init(
        {
            borrow_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expired_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Transaction",
        }
    )
    return Transaction
}
