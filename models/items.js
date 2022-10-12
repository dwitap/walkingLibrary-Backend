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
            Items.hasOne(models.Transaction)
            Items.belongsTo(models.Books)
            // define association here
        }
    }
    Items.init(
        {
            return_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fine: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            return_status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Items",
        }
    )
    return Items
}
