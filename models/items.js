"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Items extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Items.hasOne(models.Transactions)
            // Items.hasOne(models.Books)
            // define association here
        }
    }
    Items.init(
        {},
        {
            sequelize,
            modelName: "Items",
        }
    )
    return Items
}
