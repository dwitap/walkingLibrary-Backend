"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Carts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Carts.belongsTo(models.Books)
            // define association here
        }
    }
    Carts.init(
        {
        },
        {
            sequelize,
            modelName: "Carts",
        }
    )
    return Carts
}
