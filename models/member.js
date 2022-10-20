"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Member.hasMany(models.Transactions)
            Member.hasMany(models.Carts)
            // define association here
        }
    }
    Member.init(
        {
            NIM: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "member",
            },
        },
        {
            sequelize,
            modelName: "Member",
        }
    )
    return Member
}
